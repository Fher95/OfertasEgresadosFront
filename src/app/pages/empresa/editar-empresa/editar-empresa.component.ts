import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISector, ISubSector } from 'src/app/shared/interfaces/subSector';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {


  sectoresInteresEmpresa: ISector[] = [
    { "Nombre": "Estatal y Relacionados", "subSectores": [{"idSector":0, "nombre": "Medio ambiente"}, {"idSector":1, "nombre": "Minas y Energia"}] },
    { "Nombre": "Alimentos", "subSectores": [ {"idSector":1, "nombre": "Azúcar"}] }
  ];
  subSecEscogidos: ISubSector[] = [];
  anios: any[] = [];
  paises: Object;
  departamentosEmp: Object;
  ciudadesEmp: Object;
  departamentosResp: Object;
  ciudadesResp: Object;
  code: string;
  formEmpresa: FormGroup;
  isLinear = true;
  contOculto = true;
  data = "a";


  constructor(public activatedRoute: ActivatedRoute,  private empService: EmpresaService, private servGenerales: GeneralesService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    console.log(JSON.parse(this.activatedRoute.snapshot.paramMap.get('data')));
    this.empService.getDatos()

    this.formEmpresa = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        usuario: ['' , Validators.required],
        contrasenia: ['' , Validators.required],
      }),
      'datos-generales-empresa': this.formBuilder.group({
        nit: [{value: this.data, disabled:true} , [Validators.required, Validators.minLength(8)]],
        razonSocial: [{value: this.data, disabled:true} , Validators.required],
        nombreEmpresa: [{value: this.data, disabled:true} , Validators.required],
        anioCreacion: [{value: this.data, disabled:true}, Validators.required],
        numEmpleados: [''],
        ingresosEmp: [''],
        descripcionEmpresa: ['']
      }),
      'sectores': this.formBuilder.group({
        sectores: ['',Validators.required],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: [{value: this.data, disabled:true}, [Validators.required]],
        departamentoEmp: [{value: this.data, disabled:true}, Validators.required],
        ciudadEmp: [{value: this.data, disabled:true}, Validators.required],
        direccionEmp: [{value: this.data, disabled:true}, Validators.required],
        barrioEmp: [{value: this.data, disabled:true}, Validators.required],
        codigoPostalEmp: [''],
        telefonoEmp: ['',],
        emailEmp: ['', [Validators.email]],
        sitioWebEmp: ['']
      }),
      'datos-resp-legal':this.formBuilder.group({
        nombreRespLegal: ['', Validators.required],
        apellidoRespLegal: ['', Validators.required],
        telefonoFijoRespLegal: [''],
        telefonoMovilRespLegal: ['', Validators.required],
      }),
      'datos-resp-cuenta-empresa': this.formBuilder.group({
        nombreResp: ['', Validators.required],
        apellidoResp: ['', Validators.required],
        cargo: ['', Validators.required], //se recibe de la base de datos
        paisResp: ['', Validators.required],
        departamentoResp: ['', Validators.required],
        ciudadResp: ['', Validators.required],
        barrioResp: ['', Validators.required],
        direccionResp: ['', Validators.required],
        codigoPostalResp: [''],
        telefonoResp: [''],
        telefonoMovilResp: ['', Validators.required],
        horarioContacto: [''],
        faxResp: [''],
        emailCorpResp: ['', [Validators.required, Validators.email]]
      })
    });
    this.cargarPaises();
    this.cargarAnios();
  }
  cargarPaises() {
    this.servGenerales.obtenerListaPaises().subscribe(resultado => {
      this.paises = resultado.countries;
    },
      error => {
        console.log("Error al obtener los paises: ", JSON.stringify(error));
      });
  }
  cargarDepartamentosEmp(evento: string) {
    console.log(evento);
    this.servGenerales.obtenerListaDepartamentos().subscribe(resultado => {
      this.departamentosEmp = resultado.states.filter(item => item.country_id == evento);
    },
      error => {
        console.log("Error al obtener los deprtamentos: ", JSON.stringify(error));
      });
  }
  cargarCiudadesEmp(evento: string) {
    this.servGenerales.obtenerListaCiudades().subscribe(resultado => {
      this.ciudadesEmp = resultado.cities.filter(item => item.state_id == evento);
    },
      error => {
        console.log("Error al obtener las ciudades: ", JSON.stringify(error));
      });
  }
  cargarDepartamentosResp(evento: string) {
    this.servGenerales.obtenerListaDepartamentos().subscribe(resultado => {
      this.departamentosResp = resultado.states.filter(item => item.country_id == evento);
    },
      error => {
        console.log("Error al obtener los deprtamentos: ", JSON.stringify(error));
      });
  }
  cargarCiudadesResp(evento: string) {
    this.servGenerales.obtenerListaCiudades().subscribe(resultado => {
      this.ciudadesResp = resultado.cities.filter(item => item.state_id == evento);
    },
      error => {
        console.log("Error al obtener las ciudades: ", JSON.stringify(error));
      });
  }

  cargarAnios() {
    let anio = new Date().getFullYear();
    for (let i = anio; i >= 1900; i--) {
      this.anios.push(i);
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onGenerateCode(code) {
    this.code = code
  }

  verify() {
    const captchaDigitado = (<HTMLInputElement>document.getElementById("capt")).value;
    console.log(captchaDigitado);
    if (this.code === captchaDigitado) {
      const elemento = document.getElementById("1");
      elemento.style.display = 'inline';
    } else {
      alert('Captcha invalido');
    }
  }

  modificarEmpresa(formulario) {
    this.empService.modificarEmpresa(formulario.value).toPromise().then(data=>{
      console.log(data);
      console.log()
    }),
    error => console.log(error);
    console.log('salio del reg')
    this.router.navigate(['/modificarEmpresa'])
  }

  eliminarSubSectorEscogido(subSector: ISubSector){
    const posSubSector = this.subSecEscogidos.indexOf(subSector);
    this.subSecEscogidos.splice(posSubSector,1);
    this.sectoresInteresEmpresa[subSector.idSector].subSectores.push(subSector);
  }

  /*Busca la posicion del sector al que pertenece un subsector */
  buscarPosicionSectorParaSubSector(subSector: ISubSector) {
    let posicionSector;
    for (let i = 0; i < this.sectoresInteresEmpresa.length; i++) {
      posicionSector = this.sectoresInteresEmpresa[i].subSectores.indexOf(subSector);
      if(posicionSector != 1){
        break;
      }
    }
    return posicionSector;
  }

  seleccionarSubSector(sector: ISector, subSector: ISubSector){
    const posSector = this.sectoresInteresEmpresa.indexOf(sector);
    const posSubSector = this.sectoresInteresEmpresa[posSector].subSectores.indexOf(subSector);
    this.sectoresInteresEmpresa[posSector].subSectores.splice(posSubSector,1);
    console.log(this.subSecEscogidos);
    this.subSecEscogidos.push(subSector);
  }

}

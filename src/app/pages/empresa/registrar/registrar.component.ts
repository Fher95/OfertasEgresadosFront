import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { ISubSector, ISector } from '../../../shared/interfaces/subSector'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  /*sectoresInteresEmpresa: Object = [
    { "Nombre": "Estatal y Relacionados", "subSector": [{'id':1, 'nombre': "Medio ambiente"}, {'id':1, 'nombre': "Minas y Energia"}, "Organizacion no Gubernamental", "Planeacion", "Relaciones Exteriores", "Residencia, Gobernaciones", "Salud, Trabajo y Seguridad", "Servicios Publicos", "Economia Desarrollo Ecologico", "Educacion, Cultura y Turismo", "Estadistica", "Funcion Publica", "Gremios y Asociaciones", "Interior, Control y org", "Justicia del Derecho", "Agricultura y Desarrollo", "Ciencia y Tecnologia", "Comercio Exterior", "Comunicacion", "Defensa y Seguridad Nacional"] },
    { "Nombre": "Alimentos", "subSector": ["Aceites y Grasas Comestibles", "Alimentos Para Animales", {'id':2, 'nombre': "Azúcar"}, "Batidos", "Café Exportadores", "Chocolate y confiteria", "Conservas, Pasabocas", "Lácteos", "Molinera de Arroz", "Molinería de Productos de Trigo", "Pastas, Panadería y Galletas"] },
    { "Nombre": "Comercio al por Menor", "subSector": ["Almacenes de cadena", "Almacenes Varios", "Concesionarios", "Droguerias", "Estaciones de Servicio", "Ferreteria", "Hipermercados", "Supermercados", "Tiendas"] },
    { "Nombre": "Comercio al por Mayor", "subSector": ["Comercio al por Mayor"] },
    { "Nombre": "Construccion", "subSector": ["Cementos", "Ceramica y Otros Materiales", "Construccion", "Distribucion de materiales", "Infraestructura", "Infraestructura Vial", "Ingenieria Civil", "Preparacion de Terreno"] },
    { "Nombre": "Financiero", "subSector": ["Banca", "Cajeros Electrónicos", "Compañias de Financiamiento", "Compañias de Leasing", "Corporaciones de Ahorro", "Corredores de Bolsa", "Fiduciaria", "Fondo de Pensiones", "Servicios Financieros", "Tarjeta de Crédito"] },
    { "Nombre": "Servicios", "subSector": ["Alimentos - Bebidas", "Almacenes de Depósito", "Cajas de Compensacion", "Clubes", "Cooperativas", "Correo", "Hoteles", "Informáticos", "Otros Servicios", "Restaurantes", "Servicios de Aseo", "Servicios Públicos", "Turismo", "Vigilancia y Seguridad"] },
    { "Nombre": "Agropecuario", "subSector": ["Agricultura y Varios", "Avícola", "Café Producción", "Distribucion de Productos", "Flores", "Ganadería", "Pesca"] },
    { "Nombre": "Asegurador", "subSector": ["Ajustadores de Seguros", "Compañias de Seguros", "Corredores de Seguros", "Reaseguradores"] },
    { "Nombre": "Bebidas y Tabaco", "subSector": ["Cerveza", "Distribucion / Consumo Masivo", "Gaseosas, Jugos y Agua", "Licores", "Tabaco"] },
    { "Nombre": "Consultorias / Asesorias", "subSector": ["Consultoría Contable", "Consultoría de Recursos Humanos", "Firmas de Abogados", "Firmas de Consultoria Empresarial", "Temporales / Dotación"] },
    { "Nombre": "Consumo masivo", "subSector": ["Consumo masivo"] },
    { "Nombre": "Cuero y Calzado", "subSector": ["Calzado", "Curtido de Cuero", "Maletas, Bolsos y Similares"] },
    { "Nombre": "Editorial e Impresión", "subSector": ["Impresion Editorial", "Libros y Folletos y Similares"] },
    { "Nombre": "Educativo", "subSector": ["Campañas de Capacitacion", "Colegios", "Institutos Técnicos", "Universidades"] },
    { "Nombre": "Energético", "subSector": ["Compañias Petroleras", "Distribucion de Carbon", "Distribución de Combustibles", "Energía Eléctrica", "Gas", "Servicios Petroleros"] },
    { "Nombre": "Entretenimiento", "subSector": ["Cine y Videos", "Otros", "Parques de Diversiones", "Produccion de Grabación"] },
    { "Nombre": "Investigación", "subSector": ["Varios"] },
    { "Nombre": "Manufactura", "subSector": ["Distribucion de Enseres Domiciliarios", "Distribucion de Maquinaria", "Electrodomésticos", "Manufacturas Varias", "Maquinaria y Equipo", "Muebles y Accesorios", "Productos de Madera"] },
    { "Nombre": "Medios", "subSector": ["Internet", "Periódicos", "Radio", "Revistas", "Televisión"] },
    { "Nombre": "Minería, Hierro, Acero y otros Materiales", "subSector": ["Metales Básicos, Hierro, Acero", "Metales no Ferroso", "Otros", "Productos de Metal", "Siderurgia"] },
    { "Nombre": "Naval", "subSector": ["Construccion Naval", "Diseño Naval", "Mantenimiento Naval", "Naval", "Reparacion Naval"] },
    { "Nombre": "Otra Actividad", "subSector": ["Atelier de diseño", "Otra Actividad"] },
    { "Nombre": "Plástico y Caucho", "subSector": ["Plasticos Primarios", "Productos de Caucho", "Productos de Plástico"] },
    { "Nombre": "Productos de Vidrio", "subSector": ["Envases", "Otros Productos de Vidrios", "Vidrio - Construccion", "Vidrio - Vehículo"] },
    { "Nombre": "Publicidad y Mercadeo", "subSector": ["Agencias de Publicidad", "Agencias Promocionales", "Brokers de Medios", "Correo Directo", "Otros", "Relaciones Públicas"] },
    { "Nombre": "Pulpa, Papel y Cartón", "subSector": ["Papel Celulosa y Carton", "Productos de Papel y Cartón"] },
    { "Nombre": "Quimicos", "subSector": ["Abonos, Plaguicidas y Químicos", "Distribucion / Consumo Masivo", "Distribucion de Productos", "Laboratorios Farmacéuticos", "Pinturas, Barnices y Similares", "Productos de Aseo y Comsméticos", "Quimicos Básicos", "Quimicos Industriales"] },
    { "Nombre": "Salud", "subSector": ["A.R.P", "E.P.S", "I.P.S", "Mediciona Prepagada", "Seguridad Social", "Servicios Hospitalarios"] },
    { "Nombre": "Tecnología", "subSector": ["Comercio de Computadores", "Desarrollo y Diseño de Paginas Web", "Productores y Distribuidores"] },
    { "Nombre": "Telecomunicaciones", "subSector": ["Celulares", "Equipos de Comunicación", "Otros", "Servicios de Comunicación"] },
    { "Nombre": "Textiles, Prendas de Vestir y Calzado", "subSector": ["Acabados Textiles", "Confecciones", "Distribución de Productos", "Hilanderas", "Textiles"] },
    { "Nombre": "Transporte", "subSector": ["Aéreo", "Agente", "Marítimo y Fluvial", "Operadores, Agentes y Terminales", "Valores"] },
    { "Nombre": "Vehiculos y Partes", "subSector": ["Academia Automovilística", "Carrocerías, Partes y Piezas", "Comercialización de Partes", "Concesionarios", "Emsambladoras de Vehículos", "Importadores de Vehículos", "Talleres"] }
  ];*/
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
  formRegistroEmp: FormGroup;
  isLinear = true;
  contOculto = true;
  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
  ) {

  }

  ngOnInit() {
    this.formRegistroEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required],
        captchaDigitado: ['']
      }),
      'datos-generales-empresa': this.formBuilder.group({
        NIT: ['', [Validators.required, Validators.minLength(8)]],
        razonSocial: ['', Validators.required],
        nombreEmpresa: ['', Validators.required],
        anioCreacion: ['', Validators.required],
        numEmpleados: ['', Validators.required],
        ingresosEmp: [''],
        descripcionEmpresa: ['', Validators.required]
      }),
      'sectores': this.formBuilder.group({
        sectores: [''],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: ['', [Validators.required]],
        departamentoEmp: ['', Validators.required],
        ciudadEmp: ['', Validators.required],
        direccionEmp: ['', Validators.required],
        barrioEmp: ['', Validators.required],
        codigoPostalEmp: [''],
        telefonoEmp: ['', Validators.required],
        emailEmp: ['', [Validators.email]],
        sitioWebEmp: ['']
      }),
      'datos-resp': this.formBuilder.group({
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

  registrarEmpresa(formulario) {
    console.log('formulario', formulario);
    this.empService.registrarUsuario(formulario.value).toPromise().then(data=>{
      console.log(data);
    });
    console.log('salio del reg')
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

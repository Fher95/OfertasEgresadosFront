import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {

  areasInteresEmpresa: Object = [
    { "Nombre": "Estatal y Relacionados", "subAreas": ["Medio ambiente", "Minas y Energia", "Organizacion no Gubernamental", "Planeacion", "Relaciones Exteriores", "Residencia, Gobernaciones", "Salud, Trabajo y Seguridad", "Servicios Publicos", "Economia Desarrollo Ecologico", "Educacion, Cultura y Turismo", "Estadistica", "Funcion Publica", "Gremios y Asociaciones", "Interior, Control y org", "Justicia del Derecho", "Agricultura y Desarrollo", "Ciencia y Tecnologia", "Comercio Exterior", "Comunicacion", "Defensa y Seguridad Nacional"] },
    { "Nombre": "Alimentos", "subAreas": ["Aceites y Grasas Comestibles", "Alimentos Para Animales", "Azúcar", "Batidos", "Café Exportadores", "Chocolate y confiteria", "Conservas, Pasabocas", "Lácteos", "Molinera de Arroz", "Molinería de Productos de Trigo", "Pastas, Panadería y Galletas"] },
    { "Nombre": "Comercio al por Menor", "subAreas": ["Almacenes de cadena", "Almacenes Varios", "Concesionarios", "Droguerias", "Estaciones de Servicio", "Ferreteria", "Hipermercados", "Supermercados", "Tiendas"] },
    { "Nombre": "Comercio al por Mayor", "subAreas": ["Comercio al por Mayor"] },
    { "Nombre": "Construccion", "subAreas": ["Cementos", "Ceramica y Otros Materiales", "Construccion", "Distribucion de materiales", "Infraestructura", "Infraestructura Vial", "Ingenieria Civil", "Preparacion de Terreno"] },
    { "Nombre": "Financiero", "subAreas": ["Banca", "Cajeros Electrónicos", "Compañias de Financiamiento", "Compañias de Leasing", "Corporaciones de Ahorro", "Corredores de Bolsa", "Fiduciaria", "Fondo de Pensiones", "Servicios Financieros", "Tarjeta de Crédito"] },
    { "Nombre": "Servicios", "subAreas": ["Alimentos - Bebidas", "Almacenes de Depósito", "Cajas de Compensacion", "Clubes", "Cooperativas", "Correo", "Hoteles", "Informáticos", "Otros Servicios", "Restaurantes", "Servicios de Aseo", "Servicios Públicos", "Turismo", "Vigilancia y Seguridad"] },
    { "Nombre": "Agropecuario", "subAreas": ["Agricultura y Varios", "Avícola", "Café Producción", "Distribucion de Productos", "Flores", "Ganadería", "Pesca"] },
    { "Nombre": "Asegurador", "subAreas": ["Ajustadores de Seguros", "Compañias de Seguros", "Corredores de Seguros", "Reaseguradores"] },
    { "Nombre": "Bebidas y Tabaco", "subAreas": ["Cerveza", "Distribucion / Consumo Masivo", "Gaseosas, Jugos y Agua", "Licores", "Tabaco"] },
    { "Nombre": "Consultorias / Asesorias", "subAreas": ["Consultoría Contable", "Consultoría de Recursos Humanos", "Firmas de Abogados", "Firmas de Consultoria Empresarial", "Temporales / Dotación"] },
    { "Nombre": "Consumo masivo", "subAreas": ["Consumo masivo"] },
    { "Nombre": "Cuero y Calzado", "subAreas": ["Calzado", "Curtido de Cuero", "Maletas, Bolsos y Similares"] },
    { "Nombre": "Editorial e Impresión", "subAreas": ["Impresion Editorial", "Libros y Folletos y Similares"] },
    { "Nombre": "Educativo", "subAreas": ["Campañas de Capacitacion", "Colegios", "Institutos Técnicos", "Universidades"] },
    { "Nombre": "Energético", "subAreas": ["Compañias Petroleras", "Distribucion de Carbon", "Distribución de Combustibles", "Energía Eléctrica", "Gas", "Servicios Petroleros"] },
    { "Nombre": "Entretenimiento", "subAreas": ["Cine y Videos", "Otros", "Parques de Diversiones", "Produccion de Grabación"] },
    { "Nombre": "Investigación", "subAreas": ["Varios"] },
    { "Nombre": "Manufactura", "subAreas": ["Distribucion de Enseres Domiciliarios", "Distribucion de Maquinaria", "Electrodomésticos", "Manufacturas Varias", "Maquinaria y Equipo", "Muebles y Accesorios", "Productos de Madera"] },
    { "Nombre": "Medios", "subAreas": ["Internet", "Periódicos", "Radio", "Revistas", "Televisión"] },
    { "Nombre": "Minería, Hierro, Acero y otros Materiales", "subAreas": ["Metales Básicos, Hierro, Acero", "Metales no Ferroso", "Otros", "Productos de Metal", "Siderurgia"] },
    { "Nombre": "Naval", "subAreas": ["Construccion Naval", "Diseño Naval", "Mantenimiento Naval", "Naval", "Reparacion Naval"] },
    { "Nombre": "Otra Actividad", "subAreas": ["Atelier de diseño", "Otra Actividad"] },
    { "Nombre": "Plástico y Caucho", "subAreas": ["Plasticos Primarios", "Productos de Caucho", "Productos de Plástico"] },
    { "Nombre": "Productos de Vidrio", "subAreas": ["Envases", "Otros Productos de Vidrios", "Vidrio - Construccion", "Vidrio - Vehículo"] },
    { "Nombre": "Publicidad y Mercadeo", "subAreas": ["Agencias de Publicidad", "Agencias Promocionales", "Brokers de Medios", "Correo Directo", "Otros", "Relaciones Públicas"] },
    { "Nombre": "Pulpa, Papel y Cartón", "subAreas": ["Papel Celulosa y Carton", "Productos de Papel y Cartón"] },
    { "Nombre": "Quimicos", "subAreas": ["Abonos, Plaguicidas y Químicos", "Distribucion / Consumo Masivo", "Distribucion de Productos", "Laboratorios Farmacéuticos", "Pinturas, Barnices y Similares", "Productos de Aseo y Comsméticos", "Quimicos Básicos", "Quimicos Industriales"] },
    { "Nombre": "Salud", "subAreas": ["A.R.P", "E.P.S", "I.P.S", "Mediciona Prepagada", "Seguridad Social", "Servicios Hospitalarios"] },
    { "Nombre": "Tecnología", "subAreas": ["Comercio de Computadores", "Desarrollo y Diseño de Paginas Web", "Productores y Distribuidores"] },
    { "Nombre": "Telecomunicaciones", "subAreas": ["Celulares", "Equipos de Comunicación", "Otros", "Servicios de Comunicación"] },
    { "Nombre": "Textiles, Prendas de Vestir y Calzado", "subAreas": ["Acabados Textiles", "Confecciones", "Distribución de Productos", "Hilanderas", "Textiles"] },
    { "Nombre": "Transporte", "subAreas": ["Aéreo", "Agente", "Marítimo y Fluvial", "Operadores, Agentes y Terminales", "Valores"] },
    { "Nombre": "Vehiculos y Partes", "subAreas": ["Academia Automovilística", "Carrocerías, Partes y Piezas", "Comercialización de Partes", "Concesionarios", "Emsambladoras de Vehículos", "Importadores de Vehículos", "Talleres"] }
  ];
  anios: any[] = [];
  paises: Object;
  departamentosEmp: Object;
  ciudadesEmp: Object;
  departamentosResp: Object;
  ciudadesResp: Object;
  code: string;
  captchaDigitado: string;
  primerFormReg: FormGroup;
  segundoFormReg: FormGroup;
  tercerFormReg: FormGroup;
  cuartoFormReg: FormGroup;
  quintoFormReg: FormGroup;
  isLinear = true;
  contOculto = true;
  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.primerFormReg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      captchaDigitado: ['', [Validators.required]]
    });
    this.segundoFormReg = this.formBuilder.group({
      NIT: ['', [Validators.required, Validators.minLength(8)]],
      razonSocial: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      anioCreacion: ['', Validators.required],
      numEmpleados: ['', Validators.required],
      ingresosEmp: ['', Validators.required],
      descripcionEmpresa: ['', Validators.required]
    });
    this.tercerFormReg = this.formBuilder.group({
      areas: ['', Validators.required],
    });
    this.cuartoFormReg = this.formBuilder.group({
      paisEmp: ['', [Validators.required]],
      departamentoEmp: ['', Validators.required],
      ciudadEmp: ['', Validators.required],
      direccionEmp: ['', Validators.required],
      barrioEmp: ['', Validators.required],
      codigoPostalEmp: ['', Validators.required],
      telefonoEmp: ['', Validators.required],
      emailEmp: ['', [Validators.required, Validators.email]],
      sitioWebEmp: ['', Validators.required]
    });
    this.quintoFormReg = this.formBuilder.group({
      nombreResp: ['', Validators.required],
      apellidoResp: ['', Validators.required],
      cargo: ['', Validators.required],
      paisResp: ['', Validators.required],
      departamentoResp: ['', Validators.required],
      ciudadResp: ['', Validators.required],
      barrioResp: ['', Validators.required],
      direccionResp: ['', Validators.required],
      codigoPostalResp: ['', Validators.required],
      telefonoResp: ['', Validators.required],
      telefonoMovilResp: ['', Validators.required],
      horarioContacto: ['', Validators.required],
      faxResp: ['', Validators.required],
      emailCorpResp: ['', [Validators.required, Validators.email]]
    });
    this.cargarPaises();
    this.cargarAnios();
  }
  prueba() {
    console.log(this.tercerFormReg.value);
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
    if (this.code === this.captchaDigitado) {
      alert('Verify success')
    } else {
      alert('Verify faild')
      this.captchaDigitado = undefined
    }
  }

  registrarEmpresa(parametro) {
    console.log(parametro);
  }

}

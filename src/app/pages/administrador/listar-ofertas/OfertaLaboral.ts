import { ubicacion } from '../../empresa/crear-oferta-laboral/crear-oferta-laboral.component';

export class OfertaLaboral {
    id_aut_oferta: number;
    id_empresa: number;
    nombre_oferta: string;
    descripcion: string;
    id_cargo: number;
    id_contrato: number;
    numero_vacantes: number;
    id_forma_pago: number;
    experiencia: string;
    anios_experiencia: number;
    fecha_publicacion: string;
    fecha_cierre: string;
    estado: string;
    estado_proceso: string;
    id_sector: number;
    nombre_temporal_empresa: string;
    licencia_conduccion: string;
    requisitos_minimos: string;
    id_discapacidad: number;
    empresa: Empresa;
    areas_conocimiento: AreaConocimiento[];
    salario?: Salario;
    ubicaciones?: Ubicacion[];

}
export class Ubicacion {
    id_aut_ciudad?: number;
    nombre?: string;
    departamento?: string;
}
export class Empresa {

    id_aut_empresa: number;
    nit: string;
    nombre: string;
    razon_social: string;
    anio_creacion: number;
    numero_empleados: number;
    ingresos: number;
    sitio_web: string;
    id_direccion: number;
    estado: string;
    fecha_registro: string;
    fecha_activacion: string;
    total_publicaciones: number;
    limite_publicaciones: number;
    num_publicaciones_actuales: number;
    correo: string;
    url_logo: string;
    url_doc_camaracomercio: string;
}
export class AreaConocimiento {
    id_aut_areaconocimiento: number;
    nombre: string;
}

export class Salario {
    id_aut_salario: number;
    minimo: string;
    maximo: string;
    forma_pago: string;
}

export const salarioPrueba = {
    id_aut_salario: 1,
    minimo: '$700000',
    maximo: '$1500000',
    forma_pago: 'En efectivo'
}

export const empresaGenerica = {
    id_aut_empresa: 12,
    nit: 'Empresa Generica',
    nombre: 'Empresa Generica',
    razon_social: 'Empresa Generica',
    anio_creacion: 12,
    numero_empleados: 12,
    ingresos: 12,
    sitio_web: 'Empresa Generica',
    id_direccion: 12,
    estado: 'Empresa Generica',
    fecha_registro: 'Empresa Generica',
    fecha_activacion: 'Empresa Generica',
    total_publicaciones: 12,
    limite_publicaciones: 12,
    num_publicaciones_actuales: 12,
    correo: 'Empresa Generica',
    url_logo: 'Empresa Generica',
    url_doc_camaracomercio: 'Empresa Generica',
};

export const ofertaGenerica: OfertaLaboral = {
    id_aut_oferta: 111,
    id_empresa: 1234,
    nombre_oferta: 'Requeridos ingenieros',
    descripcion: 'No muy bien pago',
    id_cargo: 1,
    id_contrato: 2,
    numero_vacantes: 6,
    id_forma_pago: 3,
    experiencia: 'Cualquiera',
    anios_experiencia: 2,
    fecha_publicacion: '2019-05-04',
    fecha_cierre: '2019-07-04',
    estado: 'Pendiente',
    estado_proceso: 'Pendiente por aprobar',
    id_sector: 4,
    nombre_temporal_empresa: 'Temporal',
    licencia_conduccion: 'cualquiera',
    requisitos_minimos: 'ninguno',
    id_discapacidad: 5,
    empresa: empresaGenerica,
    areas_conocimiento: [{ id_aut_areaconocimiento: 7, nombre: 'Cualquiera' }]
};

export const lstOfertas: OfertaLaboral[] = [
    {
        id_aut_oferta: 111, id_empresa: 1234, nombre_oferta: 'Requeridos ingenieros', descripcion: 'No muy bien pago',
        id_cargo: 1, id_contrato: 2, numero_vacantes: 6, id_forma_pago: 3, experiencia: 'Cualquiera1', anios_experiencia: 2,
        fecha_publicacion: '2019-05-04', fecha_cierre: '2019-07-04', estado: 'Pendiente', estado_proceso: 'Pendiente por aprobar',
        id_sector: 4, nombre_temporal_empresa: 'Temporal', licencia_conduccion: 'cualquiera', requisitos_minimos: 'ninguno',
        id_discapacidad: 5, empresa: empresaGenerica, areas_conocimiento: [{ id_aut_areaconocimiento: 7, nombre: 'Ingenieria' }, { id_aut_areaconocimiento: 8, nombre: 'Software' },
        { id_aut_areaconocimiento: 9, nombre: 'Fisica' }], ubicaciones: [{ id_aut_ciudad: 23, nombre: 'Popayan', departamento: 'Cauca' }]
    },

    {
        id_aut_oferta: 113, id_empresa: 1234, nombre_oferta: 'Requeridos Medicos', descripcion: 'Mas o menos pago',
        id_cargo: 1, id_contrato: 2, numero_vacantes: 6, id_forma_pago: 3, experiencia: 'Cualquiera2', anios_experiencia: 2,
        fecha_publicacion: '2019-05-04', fecha_cierre: '2019-07-04', estado: 'Pendiente', estado_proceso: 'Pendiente por aprobar',
        id_sector: 4, nombre_temporal_empresa: 'Temporal', licencia_conduccion: 'cualquiera', requisitos_minimos: 'ninguno',
        // tslint:disable-next-line: max-line-length
        id_discapacidad: 5, empresa: empresaGenerica, areas_conocimiento: [{ id_aut_areaconocimiento: 7, nombre: 'Medicina' }], salario: salarioPrueba
        , ubicaciones: [{ id_aut_ciudad: 23, nombre: 'Cali', departamento: 'Valle del Cauca' }, { id_aut_ciudad: 23, nombre: 'Palmira', departamento: 'Valle del Cauca' }]
    },

    {
        id_aut_oferta: 114, id_empresa: 1234, nombre_oferta: 'Requeridos Biologos', descripcion: 'Bien pago',
        id_cargo: 1, id_contrato: 2, numero_vacantes: 6, id_forma_pago: 3, experiencia: 'Cualquiera3', anios_experiencia: 2,
        fecha_publicacion: '2019-05-04', fecha_cierre: '2019-07-04', estado: 'Pendiente', estado_proceso: 'Pendiente por aprobar',
        id_sector: 4, nombre_temporal_empresa: 'Temporal', licencia_conduccion: 'cualquiera', requisitos_minimos: 'ninguno',
        id_discapacidad: 5, empresa: empresaGenerica, areas_conocimiento: [{ id_aut_areaconocimiento: 7, nombre: 'Cualquiera' }],
        salario: salarioPrueba,
    }
]

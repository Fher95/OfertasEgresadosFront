export class Solicitud {

    id_aut_empresa?: number;
    nit?: string;
    nombre?: string;
    razon_social?: string;
    anio_creacion?: number;
    numero_empleados?: number;
    ingresos?: number;
    sitio_web?: string;
    id_direccion?: number;
    estado?: string;
    fecha_registro?: string;
    fecha_activacion?: string;
    total_publicaciones?: number;
    limite_publicaciones?: number;
    num_publicaciones_actuales?: number;
}

export const solicitudGenerica: Solicitud = {
    nombre: 'Tercero', id_aut_empresa: 1233, fecha_registro: '2019-01-10', estado: 'Inactivo', razon_social: 'Cualquiera',
    anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
    fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
    nit: '32534fd'
};

export const lstSolicitudes: Solicitud[] = [
    {
        nombre: 'primero', id_aut_empresa: 1231, fecha_registro: '2019-01-8', estado: 'Pendiente', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Segundo', id_aut_empresa: 1232, fecha_registro: '2019-01-9', estado: 'Activo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Tercero', id_aut_empresa: 1233, fecha_registro: '2019-01-10', estado: 'Inactivo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'primero', id_aut_empresa: 1231, fecha_registro: '2019-01-8', estado: 'Pendiente', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Segundo', id_aut_empresa: 1232, fecha_registro: '2019-01-9', estado: 'Activo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Tercero', id_aut_empresa: 1233, fecha_registro: '2019-01-10', estado: 'Inactivo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'primero', id_aut_empresa: 1231, fecha_registro: '2019-01-8', estado: 'Pendiente', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Segundo', id_aut_empresa: 1232, fecha_registro: '2019-01-9', estado: 'Activo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Tercero', id_aut_empresa: 1233, fecha_registro: '2019-01-10', estado: 'Inactivo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'primero', id_aut_empresa: 1231, fecha_registro: '2019-01-8', estado: 'Pendiente', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Segundo', id_aut_empresa: 1232, fecha_registro: '2019-01-9', estado: 'Activo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Tercero', id_aut_empresa: 1233, fecha_registro: '2019-01-10', estado: 'Inactivo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'primero', id_aut_empresa: 1231, fecha_registro: '2019-01-8', estado: 'Pendiente', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Segundo', id_aut_empresa: 1232, fecha_registro: '2019-01-9', estado: 'Activo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },
    {
        nombre: 'Tercero', id_aut_empresa: 1233, fecha_registro: '2019-01-10', estado: 'Inactivo', razon_social: 'Cualquiera',
        anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion: 1,
        fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
        nit: '32534fd'
    },

];

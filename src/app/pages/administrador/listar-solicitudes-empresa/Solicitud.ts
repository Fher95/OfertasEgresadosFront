export class Solicitud {

    id: number;
    nit: string;
    nombre: string;
    razon_social: string;
    anio_creacion: number;
    numero_empleados: number;
    ingresos: number;
    sitio_web: string;
    id_direccion: number;
    estado: boolean;
    fecha_registro: string;
    fecha_activacion: string;
    total_publicaciones: number;
    limite_publicaciones: number;
    num_publicaciones_actuales: number;
}

export const lstSolicitudes: Solicitud[] = [
    {nombre: 'primero', id: 1231, fecha_registro: '2019-01-8', estado: null, razon_social: 'Cualquiera',
anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion:1,
 fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
nit: '32534fd' },
{nombre: 'Segundo', id: 1232, fecha_registro: '2019-01-9', estado: true, razon_social: 'Cualquiera',
anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion:1,
 fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
nit: '32534fd' },
{nombre: 'Tercero', id: 1233, fecha_registro: '2019-01-10', estado: false, razon_social: 'Cualquiera',
anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion:1,
 fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
nit: '32534fd' },


];

export const solicitudGenerica = {nombre: 'Tercero', id: 1233, fecha_registro: '2019-01-10', estado: false, razon_social: 'Cualquiera',
anio_creacion: 2012, numero_empleados: 1000, ingresos: 2000, sitio_web: 'CualquierCosa.com', id_direccion:1,
 fecha_activacion: '1092-12-03', total_publicaciones: 2, limite_publicaciones: 10, num_publicaciones_actuales: 2,
nit: '32534fd' };

export class Solicitud {
    nombre: string;
    id: number;
    fecha: string;
    estado: string;

    "id": 0,
    "nit": "100",
    "nombre": "Big Company",
    "razon_social": "Desarrollo",
    "anio_creacion": 2010,
    "numero_empleados": 10,
    "ingresos": 10000000,
    "sitio_web": "www.company.com",
    "id_direccion": 0,
    "estado": true,
    "fecha_registro": "2019-10-19",
    "fecha_activacion": null,
    "total_publicaciones": 0,
    "limite_publicaciones": 100,
    "num_publicaciones_actuales": 0
}

export const lstSolicitudes: Solicitud[] = [
    {nombre: 'primero', id: 1231, fecha: '2019-01-8', estado: 'En espera' },
    {nombre: 'segundo', id: 5672, fecha: '2019-02-9', estado: 'En espera'},
    {nombre: 'Tercero', id: 9103, fecha: '2019-03-10', estado: 'En espera'},
    {nombre: 'primero', id: 1234, fecha: '2019-04-11', estado: 'En espera'},
    {nombre: 'segundo', id: 5675, fecha: '2019-05-12', estado: 'En espera'},
    {nombre: 'Tercero', id: 9106, fecha: '2019-06-13', estado: 'En espera'},
    {nombre: 'primero', id: 1237, fecha: '2019-07-14', estado: 'En espera'},
    {nombre: 'segundo', id: 5678, fecha: '2019-08-15', estado: 'En espera'},
    {nombre: 'Tercero', id: 9109, fecha: '2019-09-16', estado: 'En espera'},
    {nombre: 'primero', id: 12310, fecha: '2019-10-17', estado: 'En espera'},
    {nombre: 'segundo', id: 567811, fecha: '2019-11-18', estado: 'En espera'}
];

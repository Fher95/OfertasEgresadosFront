export class OfertaLaboral {
    id_aut_oferta: number;
    id_empresa: number;
    nombre: string;
    descripcion: string;
    id_cargo: number;
    numero_vacantes: number;
    salario: number;
    experiencia: string;
    anios_experiencia: number;
    fecha_publicacion: string;
    fecha_cierre: string;
    estado: string;    
}

export const ofertaGenerica: OfertaLaboral = {id_aut_oferta:1, id_empresa: 1, nombre: "Primero", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
fecha_cierre: "2019-12-12", estado: "En espera" }

export const lstOfertas: OfertaLaboral[] = [
    {id_aut_oferta:1, id_empresa: 1, nombre: "Primero", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
    salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
    fecha_cierre: "2019-12-12", estado: "En espera" },
    {id_aut_oferta:2, id_empresa: 1, nombre: "Segundo", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
    salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
    fecha_cierre: "2019-12-12", estado: "En espera" },
    {id_aut_oferta:3, id_empresa: 1, nombre: "Tercer", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
    salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
    fecha_cierre: "2019-12-12", estado: "En espera" },
    {id_aut_oferta:4, id_empresa: 1, nombre: "Cuarto", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
    salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
    fecha_cierre: "2019-12-12", estado: "En espera" },
    {id_aut_oferta:5, id_empresa: 1, nombre: "Quinto", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
    salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
    fecha_cierre: "2019-12-12", estado: "En espera" },
    {id_aut_oferta:6, id_empresa: 1, nombre: "Sexto", descripcion: "Desc", id_cargo: 3, numero_vacantes: 4,
    salario: 10000, experiencia: "Otras empresas", anios_experiencia: 3, fecha_publicacion: "2019-07.15",
    fecha_cierre: "2019-12-12", estado: "En espera" }
]
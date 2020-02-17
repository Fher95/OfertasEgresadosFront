export interface EgresadoSaveInterface {
    nombres?: string;
    apellidos?: string;
    id_lugar_expedicion?: number;
    id_ciudad_residencia?: number;
    id_ciudad_nacimiento?: number;
    genero?: string;
    num_hijos?: number;
    identificacion?: string;
    fecha_nacimiento?: Date;
    direccion?: string;
    barrio?: string;
    codigo_postal?: string;
    tipo?: string;
    mension_honor?: boolean;
    titulo_especial?: string;
    comentarios?: string;
    fecha_graduacion?: Date;
    id_nivel_educativo?: number;
    correo?: string;
    corre_alternativo?: string;
}
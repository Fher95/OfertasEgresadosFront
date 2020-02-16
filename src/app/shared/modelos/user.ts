
export class User {

    constructor(
        public nombres?: String,
        public apellidos?: String,
        public identificacion?: String,
        public id_lugar_expedicion?: Number,
        public fecha_nacimiento?: String,
        public genero?: String,
        public estado_civil?: String,
        public grupo_etnico?: String,
        public num_hijos?: number,
        public discapacidad?: number[],
        public otraDiscapacidad?: String,
        public id_lugar_nacimiento?: Number,
        public id_nivel_educativo?: Number,
        public anio_graduacion?: String,
        public mencion?: String,
        public celular?: String,
        public telefono_fijo?: String,
        public id_lugar_residencia?: Number,
        public correo?: String,
        public correo_alternativo?: String,
        public direccion?: String,
        public fecha_grado?: String,
        public id_programa?: number,
        public titulo_especial?: number
    ) { }

    public static buildFromJSON(json): User {
        return new User(json.nombre, json.apellido, json.identificacion, json.id_lugar_expedicion, json.fecha_nacimiento, json.genero, json.estado_civil, json.grupo_etnico, json.discapacidad, json.id_lugar_nacimiento,
             json.id_nivel_estudio, json.anio_grado,json.mension, json.celular, json.telefono_fijo, json.id_lugar_residencia, json.correo_electronico, json.correo_electronico_alternativo
             , json.direccion, json.fecha_grado, json.id_programa, json.titulo_especial);
    }
    

}
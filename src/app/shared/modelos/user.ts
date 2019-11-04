export class User {

    constructor(
        public nombre: String,
        public apellidos: String,
        public identificacion: String,
        public id_lugar_expedicion: Number,
        public fecha_nacimiento: String,
        public genero: String,
        public estado_civil: String,
        public grupo_etnico: String,
        public discapacidad: String,
        public id_lugar_nacimiento: Number,
        public id_nivel_educativo: Number,
        public anio_graduacion: String,
        public mension: Boolean,
        public celular: String,
        public telefono_fijo: String,
        public id_lugar_residencia: Number,
        public correo_electronico: String,
        public correo_electronico_alternativo: String,
        public dir_residencia: String,
        public fecha_grado?: String
    ) { }

    public static buildFromJSON(json): User {
        return new User(json.nombre, json.apellido, json.identificacion, json.id_lugar_expedicion, json.fecha_nacimiento, json.genero, json.estado_civil, json.grupo_etnico, json.discapacidad, json.id_lugar_nacimiento,
             json.id_nivel_estudio, json.anio_grado,json.mension, json.celular, json.telefono_fijo, json.id_lugar_residencia, json.correo_electronico, json.correo_electronico_alternativo
             , json.dir_residencia, json.fecha_grado);
    }
    
}
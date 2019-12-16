import { UsuarioModel } from './usuario.model';
import { ServicioModel } from './servicio.model';

export class ApoyoModel {
    constructor(
        public id?: number,
        public nombres?: string,
        public apellidos?: string,
        public nombreRol?: string,
        public correo?: string,
        public correoSecundario?: string,
        public servicios?: ServicioModel[],
        public usuario?: UsuarioModel
    ) { }
}

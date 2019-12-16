export interface EventoInterface {
    id_aut_evento?: number;
    nombre?: String;
    fecha_inicio?: String;
    hora_inicio?: String;
    fecha_fin?: String;
    hora_fin?: String;
    lugar?: String;
    descripcion: String;
    cupos?: number;
    a_quien_va_dirigido?: String;
    imagen?: String;
}
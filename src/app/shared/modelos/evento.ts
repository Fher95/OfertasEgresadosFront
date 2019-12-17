export interface EventoInterface {
    id_aut_evento?: number;
    nombre?: String;
    fechaInicio?: String;
    hora_inicio?: String;
    fechaFin?: String;
    hora_fin?: String;
    lugar?: String;
    descripcion: String;
    cupos?: number;
    dirigidoA?: String;
    imagePath?: String;
}
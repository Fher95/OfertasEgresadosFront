export class EventoModel {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public lugar?: string,
    public cupos?: number,
    public fechaInicio?: string,
    public fechaFin?: string,
    public dirigidoA?: string,
    public imagePath?: string | File | null
  ) {}
}

export interface ISubSector{
    idSector: number;
    nombre: string;
}

export interface ISector{
    Nombre: string;
    subSectores: ISubSector[];
}
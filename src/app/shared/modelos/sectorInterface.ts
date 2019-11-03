import { ISubSector } from './subSectorInterface'

export interface ISector{
    Nombre: string;
    subSectores: ISubSector[];
}
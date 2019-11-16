export class Experiencia{
    trabajo_en_su_area:number;
    id_ciudad:number;
    nombre_empresa:string;
    dir_empresa:string;
    tel_trabajo:number;
    cargo_nombre:string;
    rango_salario:string;
    tipo_contrato:string;
    sector:string;

    constructor()
    {
        this.trabajo_en_su_area=0;
        this.id_ciudad=0;
        this.nombre_empresa="";
        this.dir_empresa="";
        this.tel_trabajo=0;
        this.cargo_nombre="";
        this.rango_salario="";
        this.tipo_contrato="";
        this.sector="";
    }
}
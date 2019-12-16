export class Experiencia{
    trabajo_en_su_area:boolean;
    id_ciudad:number;
    nombre_empresa:string;
    dir_empresa:string;
    tel_trabajo:number;
    cargo_nombre:string;
    rango_salario:string;
    tipo_contrato:string;
    sector:string;
    fecha_inicio:Date;
    fecha_fin:Date;

    constructor()
    {
        this.trabajo_en_su_area=false;
        this.id_ciudad=0;
        this.nombre_empresa="";
        this.dir_empresa="";
        this.tel_trabajo=0;
        this.cargo_nombre="";
        this.rango_salario="";
        this.tipo_contrato="";
        this.sector="";
        this.fecha_inicio;
        this.fecha_fin;
    }
}
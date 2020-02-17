export interface datosEmpresaService{
    datosCuenta?: {
        email: string;
        contrasenia: string;
    };
    datosGeneralesEmpresa?:
    {
        nit: string; //bloqueado
        razonSocial: string;     //bloqueado
        nombreEmpresa: string;
        anioCreacion: string; //bloqueado
        numEmpleados: string;
        ingresosEmp?: string;
        descripcionEmpresa: string;
    };
    sectores?:{
        sectores: [];
    }
    locContactoEmpresa?:{
        paisEmp: string;     //bloqueado
        departamentoEmp: string;  //bloqueado
        ciudadEmp: string;  //bloqueado
        direccionEmp: string; //bloqueado
        barrioEmp: string; //bloqueado
        codigoPostalEmp?: string;
        telefonoEmp?: string;
        emailEmp?: string;
        sitioWebEmp?: string;
    };
    datosRespLegal?:{
        nombreRespLegal: string;
        apellidoRespLegal: string;
        telefonoFijoRespLegal?: string;
        telefonoMovilRespLegal: string;
    }
    datosRespCuentaEmpresa?:
    {
        nombreResp: string;
        apellidoResp: string;
        cargo: string;
        telefonoResp?: string;
        telefonoMovilResp: string;
        horarioContacto?: string;
        direccionTrabajoResp: string;
        emailCorpResp: string;
    }
}

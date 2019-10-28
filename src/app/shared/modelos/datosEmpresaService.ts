export interface datosEmpresaService{
    datosCuenta?: {
        email?: string;
        usuario?: string;
        contrasenia?: string;
    };
    datosGeneralesEmpresa?:
    {
        nit: string; //bloqueado
        razonSocial: string;     //bloqueado
        nombreEmpresa: string;   //bloqueado
        anioCreacion: string; //bloqueado
        numEmpleados?: string;
        ingresosEmp?: string;
        descripcionEmpresa?: string;
    };
    sectores?:{
        sectores: string;
    }
    locContactoEmpresa?:{
        paisEmp: string;     //bloqueado
        departamentoEmp: string;  //bloqueado
        ciudadEmp: string;  //bloqueado
        direccionEmp: string; //bloqueado
        barrioEmp: string; //bloqueado
        codigoPostalEmp?: string;
        telefonoEmp?: string;
        emailEmp: string;
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
        paisResp: string;
        departamentoResp: string;
        ciudadResp: string;
        barrioResp: string;
        direccionResp: string;
        codigoPostalResp?: string;
        telefonoResp?: string;
        telefonoMovilResp: string;
        horarioContacto?: string;
        faxResp?: string;
        emailCorpResp: string;
    }
    
}
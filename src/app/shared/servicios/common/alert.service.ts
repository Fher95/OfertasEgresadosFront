import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from 'sweetalert2';


@Injectable()
export class AlertService {

    showInfoMessage(title: string, text: string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'info',
            confirmButtonText: 'Aceptar',
        });
    }

    showSuccesMessage(title: string, text: string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
    }

    showErrorMessage(title: string, text: string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    }
    showconfirmationMessage(title: string, text: string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
        });
    }
}
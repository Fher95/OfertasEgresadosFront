import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/shared/servicios/egresados/file-upload.service';

@Component({
  selector: 'app-verificar-excel',
  templateUrl: './verificar-excel.component.html',
  styleUrls: ['./verificar-excel.component.css']
})
export class VerificarExcelComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  constructor(private service: FileUploadService) { }

  ngOnInit() {
  }

  uploadFile() {
    let formData = new FormData();
    console.log(this.fileInput.nativeElement.files[0]);
    formData.append('fileInput', this.fileInput.nativeElement.files[0]);  
    this.service.uploadFile(formData).subscribe(result => {  
      alert('It Works!!');
    });
  }

}

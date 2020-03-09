import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileText?: string;
  showError = false;
  accept = '.xsl,.xlsx,.csv';

  @Output() importFile = new EventEmitter();
  fileToUpload: File = null;
  disabled = true;
  constructor(private alert: AlertService) {}

  ngOnInit() {}

  onFileChange(fileList: FileList) {
    this.fileText = Array.from(fileList)
      .map(f => f.name)
      .join(', ');
    let extension = '.' + this.fileText.split('.').pop();
    let finding = false;
    this.accept.split(',').forEach((value, idx) => {
      console.log(value.trim() + ' ==? ' + extension);
      if (value.trim() == extension) finding = true;
    });
    if (finding) {
      this.fileToUpload = fileList.item(0);
      this.showError = false;
      this.disabled = false;
    } else {
      this.disabled = true;
      this.showError = true;
      this.fileText = '';
      this.alert.showErrorMessage('Error', 'Solo se permiten extensiones ' + this.accept);
    }
  }

  fileSelected() {
    const fileUploadComp = document.getElementById(
      'importFile'
    ) as HTMLInputElement;
    fileUploadComp.click();
  }

  import() {
    this.importFile.emit(this.fileToUpload);
  }
}

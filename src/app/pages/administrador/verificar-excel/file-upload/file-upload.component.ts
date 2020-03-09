import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileText?: string;
  showError = false;

  @Output() importFile = new EventEmitter();
  fileToUpload: File = null;

  constructor() {}

  ngOnInit() {}

  onFileChange(fileList: FileList) {
    this.fileText = Array.from(fileList)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = fileList.item(0);
    if (this.fileText == '') {
      this.showError == true;
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

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('labelImport')
  labelImport: ElementRef;
  @Output() importFile = new EventEmitter();
  fileToUpload: File = null;

  constructor() { }

  ngOnInit() {
  }

  onFileChange(fileList: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(fileList)
      .map(f => f.name).join(', ');
    this.fileToUpload = fileList.item(0);
  }

  import() {
    this.importFile.emit(this.fileToUpload);
  }

}

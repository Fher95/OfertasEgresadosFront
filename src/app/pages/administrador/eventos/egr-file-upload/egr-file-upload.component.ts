import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-egr-file-upload',
  templateUrl: './egr-file-upload.component.html',
  styleUrls: ['./egr-file-upload.component.css']
})
export class EgrFileUploadComponent implements OnInit {
  fileText: string | null;
  @Output() importEvent: EventEmitter<File> = new EventEmitter<File>();
  fileToUpload: File = null;
  @Input()
  text: string;
  @Input()
  accept: string;

  constructor() {}

  ngOnInit() {}

  onFileChange(fileList: FileList) {
    this.fileText = Array.from(fileList)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = fileList.item(0);
    this.importEvent.emit(this.fileToUpload);
  }

  onClick() {
    const fileUploadComp = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUploadComp.click();
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-egr-file-upload-update',
  templateUrl: './egr-file-upload-update.component.html',
  styleUrls: ['./egr-file-upload-update.component.css']
})
export class EgrFileUploadUpdateComponent implements OnInit {
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
      'fileUploadUpdate'
    ) as HTMLInputElement;
    fileUploadComp.click();
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

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
  @Input()
  labelText: string;

  isCancelPress: boolean = false;

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  onFileChange(fileList: FileList) {
    if (this.isCancelPress) {
      this.fileText = '';
      this.isCancelPress = false;
    } else {
      this.fileText = Array.from(fileList)
        .map(f => f.name)
        .join(', ');
        let extension = '.' + this.fileText.split('.').pop();
        let finding = false;
        this.accept.split(',').forEach((value, idx) => {
          if (value.trim() == extension) finding = true;
        });
        if(finding){
          this.fileToUpload = fileList.item(0);
          this.importEvent.emit(this.fileToUpload);
        } else {
          this.fileText = '';
          this.alertService.showErrorMessage('Error', 'Solo se permiten extensiónes ' + this.accept);
        }
    }
  }

  onClick() {
    const fileUploadComp = document.getElementById(
      'fileUploadUpdate'
    ) as HTMLInputElement;
    fileUploadComp.click();
  }
}

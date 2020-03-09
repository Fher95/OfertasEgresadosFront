import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { find } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

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
  @Input()
  labelText: string;

  showError: boolean = true;
  cancelPress: boolean = false;

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  onFileChange(fileList: FileList) {
    if (this.cancelPress) {
      this.fileText = null;
      this.showError = true;
      this.cancelPress = false;
    } else {
      this.fileText = Array.from(fileList)
        .map(f => f.name)
        .join(', ');
      let extension = '.' + this.fileText.split('.').pop();
      let finding = false;
      this.accept.split(',').forEach((value, idx) => {
        console.log(value.trim() + " ==? " + extension);
        if (value.trim() == extension) finding = true;
      });
      if(finding){
        this.fileToUpload = fileList.item(0);
        this.importEvent.emit(this.fileToUpload);
        this.showError = false;
      } else {
        this.fileText = '';
        this.alertService.showErrorMessage('Error', 'Solo se permiten extensiones ' + this.accept);
      }
    }
  }

  onClick() {
    const fileUploadComp = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUploadComp.click();
  }
}

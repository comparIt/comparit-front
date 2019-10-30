import {Component, OnInit} from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';

const apiSupplierUrl = 'http://localhost:8080/supplier/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  title = 'compare-it-front-uploader';
  public uploader: FileUploader = new FileUploader({ url: apiSupplierUrl, itemAlias: 'csv' });
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('CsvUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }
}

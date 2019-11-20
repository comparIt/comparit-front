import {Component, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Model} from '../shared/models/model';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
  ) {
    this.types = [
      {label: 'Select type', value: null},
      {label: 'Phone', value: {name: 'phone'}},
      {label: 'Car', value: {name: 'car'}}
    ];
  }

  types: SelectItem[];
  uplo: File;
  selectedType: Model;
  upload(event) {
    console.log(event);
  }

  url() {
    console.log(this.compareItAPIService.getUploadCsv(this.selectedType));
    return this.compareItAPIService.getUploadCsv(this.selectedType);
  }
}

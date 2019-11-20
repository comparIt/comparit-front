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
      {label: 'Phone', value: {name: 'phonex'}},
      {label: 'Car', value: {name: 'cars'}}
    ];
  }

  types: SelectItem[];
  uplo: File;
  selectedType: Model;

  url(): string {
    return this.compareItAPIService.getUploadCsv(this.selectedType);
  }

  error(event) {
    console.log(event);
  }

  upload(event) {
    console.log(event);
  }
}

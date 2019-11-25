import {Component, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../../shared/services/compareItAPI.service';
import {Model} from '../../shared/models/model';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-upload',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class UploadCsvComponent {

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
  ) {
    this.types = [
      {label: 'Select type', value: null},
      {label: 'Phone', value: {name: 'phones'}},
      {label: 'Car', value: {name: 'cars'}}
    ];
  }

  types: SelectItem[];
  selectedType: Model;
  showResult: boolean;

  url(): string {
    return this.compareItAPIService.getUploadCsv(this.selectedType);
  }

  error(event) {
    console.log(event);
  }

  upload(event) {
    this.showResult = true;
    console.log(event);
  }
}

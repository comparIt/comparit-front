import {Component, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../../../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../../../../shared/services/compareItAPI.service';
import {Model} from '../../../../shared/models/model';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-upload',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class UploadCsvComponent {

  types: SelectItem[];
  selectedType: Model;
  showResult: boolean;

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
  ) {
    this.types = this.globalconfigurationService.models.map(model => {
      return {label: model.name, value: {name: model.technicalName}};
    });
    this.types.unshift({label: 'Select type', value: null});
  }

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

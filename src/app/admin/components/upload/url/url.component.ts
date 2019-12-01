import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConfigurationService} from '../../../../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../../../../shared/services/compareItAPI.service';
import {SelectItem} from 'primeng/api';
import {Model} from '../../../../shared/models/model';

@Component({
  selector: 'app-supplier',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UploadUrlComponent implements OnInit {

  types: SelectItem[];
  selectedType: Model;
  showResult: boolean;

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
    private httpClient: HttpClient
  ) {
    this.types = this.globalconfigurationService.models.map(model => {
      return {label: model.name, value: {name: model.technicalName}};
    });
    this.types.unshift({label: 'Select type', value: null});
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.getUploadUrl(formData.type.name, formData.url);
  }

  getUploadUrl(typeProduit: string, url: string) {
    this.httpClient.get(this.compareItAPIService.getUploadUrl(typeProduit) + '?url=' + url)
      .toPromise()
      .then(() => this.showResult = true)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}

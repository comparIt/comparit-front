import {Component} from '@angular/core';
import {GlobalConfigurationService} from '../../../../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../../../../shared/services/compareItAPI.service';
import {Model} from '../../../../shared/models/model';
import {MessageService, SelectItem} from 'primeng/api';


@Component({
  selector: 'app-upload',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class UploadCsvComponent {

  types: SelectItem[];
  selectedType: Model;

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
    private messageService: MessageService,
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
    this.messageService.add({severity: 'error', summary: 'Echec de l\'import du fichier', detail: event.error.error.message, life: 60000});
    this.globalconfigurationService.fetch();
  }

  upload(event) {
    this.messageService.add({severity: 'success', summary: 'Import terminé', detail: 'Données importées', life: 10000});
    this.globalconfigurationService.fetch();
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes', life: 60000});
    this.globalconfigurationService.fetch();
  }

  clear() {
    this.messageService.clear();
  }
}

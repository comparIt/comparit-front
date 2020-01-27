import {Component, OnInit} from '@angular/core';
import Stepper from 'bs-stepper';
import {Configuration} from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Model} from '../shared/models/model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MatomoTracker} from 'ngx-matomo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private stepper: Stepper;
  configuration: Configuration;
  uploadedFiles: any[] = [];
  submitted = false;

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private matomoTracker: MatomoTracker
  ) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.configuration = this.globalconfigurationService.currentConfig;
    this.matomoTracker.trackPageView(this.constructor.name);
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  onSubmit() {
    this.submitted = true;
    this.globalconfigurationService.putConfiguration(this.configuration).then((configuration: Configuration) => {
      this.submitted = false;
      this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Configuration enregistrée', life: 1000});
      return this.globalconfigurationService.fetch();
    }).then((config: Configuration) => {
      this.configuration = config;
    }).catch(() => {
      this.submitted = false;
      this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Echec de l\'enregistrement', life: 1000});
    });
  }

  addModel() {
    this.configuration.models.push(Model.defaultModel());
  }

  deleteModel(event: Model) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette catégorie ?',
      accept: () => {
        this.configuration.models = this.configuration.models.filter(obj => obj !== event);
      }
    });
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

  }

}

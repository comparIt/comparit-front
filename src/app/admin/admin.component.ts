import {Component, OnInit} from '@angular/core';
import Stepper from 'bs-stepper';
import {Configuration} from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Model} from '../shared/models/model';

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
  showResult = false;

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
  ) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.configuration = this.globalconfigurationService.currentConfig;
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    this.globalconfigurationService.putConfiguration(this.configuration);
    this.showResult = true;
  }

  addModel() {
    this.configuration.models.push(Model.defaultModel());
  }

  deleteModel(event: Model) {
    this.configuration.models = this.configuration.models.filter(obj => obj !== event);
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

  }

}

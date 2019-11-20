import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Configuration } from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service'
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import { Model } from '../shared/models/model';

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
    ) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.configuration = new Configuration();
    this.configuration.models = [];
    this.configuration.colorPrimary="#c26d6d";
    this.configuration.colorSecondary="#50459c";
    this.configuration.colorSecondary2="#82bd2a";
    this.configuration.logo="pictures";
    this.configuration.featAnalytic=false;
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    console.log(this.configuration);
    this.globalconfigurationService.putConfiguration(this.configuration);
  }

createModel(): Model {
  let model: Model = new Model;
  model.name = "";
  model.isActivited = false;
  model.technicalName = "";
  model.modelProperties = [];
  return model;
}

  addModel() {
    this.configuration.models.push(this.createModel());
    console.log(this.configuration);
  }

  deleteModel(event: Model) {
    this.configuration.models = this.configuration.models.filter(obj => obj !== event);
  }

  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);   
    }
    
  }

}

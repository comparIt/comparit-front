import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Configuration } from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service'
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Model } from '../shared/models/model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private stepper: Stepper;
  configuration: Configuration;
  submitted = false;
  configurationForm: FormGroup;

 
  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.configuration = new Configuration();
    this.configurationForm = this.fb.group({
      nomInstance: [null],
      colorPrimary: [null],
      colorSecondary: [null],
      colorSecondary2: [null],
      logo : [null],
      models: this.fb.array([this.createModel()])
  });
  }

  next() {
    this.stepper.next();
  }

  onSubmit(configurationForm: NgForm) {
    console.log(configurationForm.value);
    console.log(configurationForm.value['CPrincipal']);
    this.configuration.colorPrimary = configurationForm.value['CPrincipal'];
    console.log(this.configuration);
    this.compareItAPIService.putwebsiteconfig(this.configuration).subscribe();
  }


  // convenience getters for easy access to form fields
  get configurationWeb() { return this.configurationForm.controls; }
  get models() { return this.configurationForm.get('models') as FormArray; }

createModel(): FormGroup {
  return this.fb.group({
    name: [null],
    technicalName: [null],
    isActivited: [null],
    models: new FormArray([])
  });
}

  addModel() {
    //const m: Model = new Model();
    this.models.push(this.fb.group(this.createModel()));
  }

  deleteModel(index) {
    this.models.removeAt(index);
  }

}

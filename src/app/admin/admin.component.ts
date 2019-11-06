import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Configuration } from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service'
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import { FormBuilder, FormGroup, FormArray, Validators,NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Model } from '../shared/models/model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private stepper: Stepper;
  private configuration: Configuration;
  submitted = false;
  dynamicForm: FormGroup;
  

  constructor(
    private globalconfigurationService: GlobalConfigurationService,
    private compareItAPIService: CompareItAPIService,
    private formBuilder: FormBuilder
    ) { 
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

  ngOnInit() {
    this.configuration = new Configuration();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.dynamicForm = this.formBuilder.group({
      numberOfModels: ['', Validators.required],
      Models: new FormArray([])
  });
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.Models as FormArray; }

  onChangeModels(e) {
    const numberOfModels = e.target.value || 0;
    if (this.t.length < numberOfModels) {
        for (let i = this.t.length; i < numberOfModels; i++) {
            this.t.push(this.formBuilder.group({   
            }));
        let m:Model = new Model;
        this.globalconfigurationService.model.push(m);
        }
        
    } else {
        for (let i = this.t.length; i >= numberOfModels; i--) {
            this.t.removeAt(i);
        }
    }
}

}

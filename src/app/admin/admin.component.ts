import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Configuration } from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service'
import {compareItAPIService} from '../shared/services/compareItAPI.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private stepper: Stepper;
  private configuration:Configuration;


  constructor(
    private globalconfigurationService:GlobalConfigurationService,
    private compareItAPIService:compareItAPIService
    ) { }

  next() {
    this.stepper.next();
  }
  onSubmit(configurationForm: NgForm) {
    console.log(configurationForm.value);
    console.log(configurationForm.value['CPrincipal']);
    this.configuration.colorPrimary=configurationForm.value['CPrincipal'];
    this.configuration
    console.log(this.configuration);
    this.compareItAPIService.addConfiguration(this.configuration);
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

}

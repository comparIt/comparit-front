import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Configuration } from '../shared/models/configuration';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private stepper: Stepper;
  private configuration:Configuration;


  constructor(private globalconfigurationService:GlobalConfigurationService) { }

  next() {
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

}

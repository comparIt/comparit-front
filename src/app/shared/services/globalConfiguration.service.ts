import {Injectable} from '@angular/core';
import {Configuration} from '../models/configuration';
import { Model } from '../models/model';
import { modelProperty } from '../models/modelProperty';
import {CompareItAPIService} from './compareItAPI.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigurationService {

  configuration: Configuration;

  fetchGlobalConfiguration() {
    this.configuration = new Configuration();
    this.configuration.models = [];
    
  }

  constructor( public compareItAPIService: CompareItAPIService) {
    this.fetchGlobalConfiguration();
    this.configuration.colorPrimary = 'red lighten-1';
  }

  get adminId(): BigInteger {
    return this.configuration.adminId;
  }
  get nomInstance(): string {
    return this.configuration.nomInstance;
  }
  get colorPrimary(): string {
    return this.configuration.colorPrimary;
  }
  get colorSecondary(): string {
    return this.configuration.colorSecondary;
  }
  get colorSecondary2(): string {
    return this.configuration.colorSecondary;
  }
  get logo(): string {
    return this.configuration.logo;
  }

  get model(): Model[]{
    return this.configuration.models;
  }

  putConfiguration(configuration:Configuration){
    this.compareItAPIService.putWebsiteconfig(configuration).then((json) => this.configuration = json);
  }

  
}

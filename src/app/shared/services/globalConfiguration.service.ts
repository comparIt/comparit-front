import {Injectable} from '@angular/core';
import {Configuration} from '../models/configuration';
import {Model} from '../models/model';
import {ModelProperty} from '../models/modelProperty';
import {CompareItAPIService} from './compareItAPI.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigurationService {

  configuration: Configuration;

  fetchGlobalConfiguration() {
    this.configuration = new Configuration();
    this.configuration.models = [];
    const colorProperty = new ModelProperty(
      'couleur',
      'color',
      true,
      'ENUMERATIVE',
      true,
      false,
      false,
      0,
      0,
      ['rouge', 'noir']);
    const priceProperty = new ModelProperty(
      'Prix',
      'price',
      true,
      'NUMERIC',
      true,
      false,
      false,
      1000,
      10000,
      []);
    const typePropery = new ModelProperty('Moteur',
      'motor',
      true,
      'ENUMERATIVE',
      true,
      false,
      false,
      0,
      0,
      ['thermique', 'Electrique'])
    const car = new Model();
    car.technicalName = 'car';
    car.modelProperties = [colorProperty, priceProperty, typePropery];

    this.configuration.models.push(car);
    this.configuration.colorPrimary = '#ef5350';
  }

  constructor(public compareItAPIService: CompareItAPIService) {
    this.fetchGlobalConfiguration();
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

  get models(): Model[] {
    return this.configuration.models;
  }

  modelByType(type: string): Model {
    return this.configuration.models.find(e => e.technicalName === type);
  }

  putConfiguration(configuration: Configuration) {
    this.compareItAPIService.putWebsiteconfig(configuration).then((json) => this.configuration = json);
  }


}

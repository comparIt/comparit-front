import {Injectable} from '@angular/core';
import {Configuration} from '../models/configuration';
import {Model} from '../models/model';
import {CompareItAPIService} from './compareItAPI.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ModelProperty} from '../models/modelProperty';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigurationService implements Resolve<Configuration> {

  private configuration: Configuration;

  constructor(public compareItAPIService: CompareItAPIService, private router: Router) {

  }

  get adminId(): BigInteger {
    return this.configuration.adminId;
  }

  get colorPrimary(): string {
    return this.currentConfig.colorPrimary;
  }

  get colorSecondary(): string {
    return this.currentConfig.colorSecondary;
  }

  get colorSecondary2(): string {
    return this.currentConfig.colorSecondary;
  }

  get logo(): string {
    return this.currentConfig.logo;
  }

  get models(): Model[] {
    return this.currentConfig.models;
  }

  get currentConfig(): Configuration {
    return this.configuration ? this.configuration : Configuration.defaultConfiguration();
  }

  modelByType(type: string): Model {
    return this.currentConfig.models.find(e => e.technicalName === type);
  }

  propertyByModelAndId(type: string, id: number): ModelProperty {
    return this.modelByType(type).modelProperties.find(e => e.id === id);
  }

  propertyByModelAndName(type: string, property: string): ModelProperty {
    return this.modelByType(type).modelProperties.find(e => e.technicalName === property);
  }

  putConfiguration(configuration: Configuration): Promise<Configuration> {
    return this.compareItAPIService.putWebsiteconfig(configuration).then((json) => {
      this.configuration = Configuration.buildConfiguration(json);
      return this.configuration;
    });
  }

  fetch() {
    return this.compareItAPIService.getWebsiteConfiguration().then((wsc: Configuration) => {
      if (wsc) {
        this.configuration = Configuration.buildConfiguration(wsc);
      } else { // id not found
        this.configuration = Configuration.defaultConfiguration();
      }
      return this.configuration;
    }).catch(() => {
      this.configuration = Configuration.defaultConfiguration();
      return this.configuration;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Configuration> | Promise<Configuration> | Configuration {
    return this.fetch();
  }

}

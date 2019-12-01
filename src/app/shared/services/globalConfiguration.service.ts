import {Injectable} from '@angular/core';
import {Configuration} from '../models/configuration';
import {Model} from '../models/model';
import {CompareItAPIService} from './compareItAPI.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigurationService implements Resolve<Configuration> {

  private configuration: Configuration;

  constructor(public compareItAPIService: CompareItAPIService, private router: Router) {

  }

  fetchGlobalConfiguration() {
    this.configuration = new Configuration();
    this.configuration.models = [];
    const m1: Model = new Model();
    m1.name = 'Category 1';
    m1.technicalName = 'p1';
    const m2: Model = new Model();
    m2.name = 'Category 2';
    m2.technicalName = 'p2';
    const m3: Model = new Model();
    m3.name = 'Category 3';
    m3.technicalName = 'p3';
    const m4: Model = new Model();
    m4.name = 'Category 4';
    m4.technicalName = 'p4';
    const m5: Model = new Model();
    m5.name = 'Category 5';
    m5.technicalName = 'p5';
    this.configuration.models.push(m1, m2, m3, m4, m5);
  }

  get adminId(): BigInteger {
    return this.configuration.adminId;
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

  get currentConfig(): Configuration {
    return this.configuration;
  }

  modelByType(type: string): Model {
    return this.configuration.models.find(e => e.technicalName === type);
  }

  putConfiguration(configuration: Configuration) {
    this.compareItAPIService.putWebsiteconfig(configuration).then((json) => this.configuration = Configuration.buildConfiguration(json));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Configuration> | Promise<Configuration> | Configuration {
    return this.configuration ? this.configuration : this.compareItAPIService.getWebsiteConfiguration().then((wsc: Configuration) => {
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

}

import {Injectable} from '@angular/core';
import {Configuration} from '../models/configuration';
import {Model} from '../models/model';
import {CompareItAPIService} from './compareItAPI.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigurationService  implements Resolve<Configuration> {

  private configuration: Configuration;

  constructor(public compareItAPIService: CompareItAPIService, private router: Router) {
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

  modelByType(type: string): Model {
    return this.configuration.models.find(e => e.technicalName === type);
  }

  putConfiguration(configuration: Configuration) {
    this.compareItAPIService.putWebsiteconfig(configuration).then((json) => this.configuration = Configuration.buildConfiguration(json));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Configuration> | Promise<Configuration> | Configuration {
    return this.configuration ? this.configuration :  this.compareItAPIService.getWebsiteConfiguration().then( (wsc: Configuration) => {
      if (wsc) {
        this.configuration = Configuration.buildConfiguration(wsc);
        return this.configuration;
      } else { // id not found
        this.router.navigate(['/app/home']);
        return false;
      }
    });
  }


}

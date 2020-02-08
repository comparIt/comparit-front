import {Injectable} from '@angular/core';
import {GlobalConfigurationService} from './globalConfiguration.service';
import {MatomoTracker} from 'ngx-matomo';

@Injectable({
  providedIn: 'root',
})
export class MatomoService {

  constructor(public conf: GlobalConfigurationService, private matomoTracker: MatomoTracker) {
  }

  trackEvent(category: string, action: string, name?: string, value?: number): void {
    if (this.conf.currentConfig.featAnalytic){
      this.matomoTracker.trackEvent(category, action, name, value);
    }
  }

  trackPageView(customTitle?: string): void {
    if (this.conf.currentConfig.featAnalytic) {
      this.matomoTracker.trackPageView(customTitle);
    }
  }

  setUserId(userId: string): void {
    if (this.conf.currentConfig.featAnalytic) {
      this.matomoTracker.setUserId(userId);
    }
  }

}

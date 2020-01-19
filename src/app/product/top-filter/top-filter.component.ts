import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SelectItem} from 'primeng/api';
import {Model} from '../../shared/models/model';
import {ModelProperty} from '../../shared/models/modelProperty';
import {AuthenticationService} from '../../shared/services/authentification.service';
import {Router} from '@angular/router';
import {MatomoTracker} from 'ngx-matomo';

@Component({
  selector: 'app-top-filter',
  templateUrl: './top-filter.component.html'
})
export class TopFilterComponent implements OnInit {

  constructor(public config: GlobalConfigurationService,
              private router: Router,
              public authenticationService: AuthenticationService,
              private matomoTracker: MatomoTracker) { }

  @Input() model: Model;
  @Output() searchEvent = new EventEmitter();
  @Output() saveFilterEvent = new EventEmitter();
  modalSaveAlertVisible = false;

  order: string;
  orderOptions: SelectItem[];

  ngOnInit() {
    this.matomoTracker.trackPageView(this.constructor.name);
    this.orderOptions =  this.model.filterableProperties.filter((p) => p.isNumeric)
      .map((p) => {
          return  [
            {label: p.name + ' croissant', value: p.technicalName},
            {label: p.name + ' décroissant', value: '-' + p.technicalName}
          ];
        }
      )
      .reduceRight((previousValue, currentValue) => previousValue.concat(currentValue));
    this.orderOptions.unshift({label: 'Trier par :', value: null});
  }

  get filterableProperties(): ModelProperty[] {
    return this.model.modelProperties.filter((p: ModelProperty) => p.activated && p.filtrable);
  }

  search() {
    this.searchEvent.emit({order: this.order});
  }

  filters() {
    this.router.navigate(['user/filter']);
  }
  save(event) {
    this.modalSaveAlertVisible = false;
    this.saveFilterEvent.emit({order: this.order, alert: event.alert});
  }

  alert() {
    this.modalSaveAlertVisible = true;
  }

}

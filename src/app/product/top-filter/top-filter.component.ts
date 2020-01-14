import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SelectItem} from 'primeng/api';
import {Model} from '../../shared/models/model';
import {ModelProperty} from '../../shared/models/modelProperty';
import {AuthenticationService} from '../../shared/services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-filter',
  templateUrl: './top-filter.component.html'
})
export class TopFilterComponent implements OnInit {

  constructor(public config: GlobalConfigurationService, public authenticationService: AuthenticationService, public router: Router) { }

  @Input() model: Model;
  @Output() searchEvent = new EventEmitter();
  @Output() saveFilterEvent = new EventEmitter();
  modalSaveAlertVisible = false;

  order: string;
  orderOptions: SelectItem[];

  ngOnInit() {
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

  save(event) {
    this.modalSaveAlertVisible = false;
    this.saveFilterEvent.emit({order: this.order, alert: event.alert});
  }

  alert() {
    this.modalSaveAlertVisible = true;
  }

}

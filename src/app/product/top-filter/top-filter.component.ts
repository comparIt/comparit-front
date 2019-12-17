import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SelectItem} from 'primeng/api';
import {Model} from '../../shared/models/model';
import {ModelProperty} from '../../shared/models/modelProperty';

@Component({
  selector: 'app-top-filter',
  templateUrl: './top-filter.component.html'
})
export class TopFilterComponent implements OnInit {

  constructor(public config: GlobalConfigurationService) { }

  @Input() model: Model;
  @Output() searchEvent = new EventEmitter();

  get filterableProperties(): ModelProperty[] {
    return this.model.modelProperties.filter((p: ModelProperty) => p.activated && p.filtrable);
  }

  ngOnInit() {
  }


}

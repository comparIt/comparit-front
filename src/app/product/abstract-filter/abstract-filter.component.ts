import {Component, Input, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {ModelProperty} from '../../shared/models/modelProperty';

@Component({
  selector: 'app-abstract-filter',
  templateUrl: './abstract-filter.component.html'
})
export class AbstractFilterComponent implements OnInit {

  constructor(private config: GlobalConfigurationService) { }

  @Input() property: ModelProperty;

  ngOnInit() {
  }

  get valuesAsObject(): any[] {
    return this.property.values.map(v => ({label: v, value : v}));
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SelectItem} from 'primeng/api';
import {ModelProperty} from '../../shared/models/model-property';

@Component({
  selector: 'app-abstract-filter',
  templateUrl: './abstract-filter.component.html'
})
export class AbstractFilterComponent implements OnInit {

  constructor(private config: GlobalConfigurationService) { }

  @Input() property: ModelProperty;

  ngOnInit() {

  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SelectItem} from 'primeng/api';
import {Model} from '../../shared/models/model';

@Component({
  selector: 'app-top-filter',
  templateUrl: './top-filter.component.html'
})
export class TopFilterComponent implements OnInit {

  constructor(private config: GlobalConfigurationService) { }

  @Input() model: Model;
  @Output() searchEvent = new EventEmitter();

  ngOnInit() {
  }


}

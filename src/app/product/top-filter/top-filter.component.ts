import {Component, Input, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-top-filter',
  templateUrl: './top-filter.component.html'
})
export class TopFilterComponent implements OnInit {

  constructor(
    private config: GlobalConfigurationService) { }

  cities1: SelectItem[];
  selectedCities1 = [];
  val: number;

  ngOnInit() {
    this.cities1 = [
      {label: 'New York', value: 'a'},
      {label: 'New York', value: 'b'},
      {label: 'New York', value: 'c'},
      {label: 'New York', value: 'd'},
      {label: 'New York', value: 'e'},
    ];


  }

}

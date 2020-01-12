import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../shared/models/filter';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-detail-filter',
  templateUrl: './detail-filter.component.html',
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        padding: 0,
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1',
        padding: '1.25em'
      })),
      transition('initial=>final', animate('250ms')),
      transition('final=>initial', animate('250ms'))
    ])
  ]
})
export class DetailFilterComponent implements OnInit {

  constructor() { }
  @Input() filter: Filter;
  checked: boolean;

  ngOnInit() {
  }

}

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GlobalConfigurationService} from '../../../shared/services/globalConfiguration.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-feature-switch',
  templateUrl: './feature-switch.component.html',
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
    ]),
  ]
})
export class FeatureSwitchComponent implements OnInit {

  constructor(public config: GlobalConfigurationService) {
  }

  ngOnInit() {
  }



}

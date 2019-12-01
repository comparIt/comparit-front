import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  template: 'Erreur {{errorCode}}'
})
export class ErrorComponent implements OnInit {

  private errorCode: string;

  constructor(
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.errorCode = params.errorCode;
    });
  }

}

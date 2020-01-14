import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';
import {SavedFilter} from '../../models/savedFilter';

@Component({
  selector: 'app-add-alert',
  template: `
      <p-radioButton name="groupname-{{id}}" value="AUCUNE" label='Aucune alerte' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <p-radioButton name="groupname-{{id}}" value="QUOTIDIENNE" label='Quotidienne' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <p-radioButton name="groupname-{{id}}" value="HEBDOMADAIRE" label='Hebdomadaire' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <p-radioButton name="groupname-{{id}}" value="MENSUELLE" label='Mensuelle' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <button type="button"
              class="btn"
              [ngStyle]="{'background-color': config.colorPrimary, 'width': '100%'}"
              (click)="save()"
      ><i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </p-dialog>
  `
})
export class AddAlertComponent implements OnInit {

  @Input() filter: SavedFilter;
  @Input() alertFrequency = 'AUCUNE';
  @Output() saveAlerte = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor(public config: GlobalConfigurationService) {
  }

  ngOnInit(): void {

  }

  save() {
    this.saveAlerte.emit({alert: this.alertFrequency});
    this.onClose.emit();
  }

  get id() {
    return this.filter ? this.filter.id : 0;
  }

}

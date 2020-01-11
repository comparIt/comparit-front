import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';
import {ActivatedRoute} from '@angular/router';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-add-alert',
  template: `
    <p-dialog header="Ajouter une alerte" [(visible)]="visible" [style]="{width: '300px'}" (onHide)="onClose.emit()">
      <p-radioButton name="groupname" value="AUCUNE" label='Aucune alerte' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <p-radioButton name="groupname" value="QUOTIDIENNE" label='Quotidienne' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <p-radioButton name="groupname" value="HEBDOMADAIRE" label='Hebdomadaire' [(ngModel)]="alertFrequency"></p-radioButton><br/>
      <p-radioButton name="groupname" value="MENSUELLE" label='Mensuelle' [(ngModel)]="alertFrequency"></p-radioButton><br/>
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

  @Input() alertFrequency = 'AUCUNE';
  @Input() visible = false;
  @Output() saveAlerte = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor(private config: GlobalConfigurationService) {
  }

  ngOnInit(): void {

  }

  save() {
    this.saveAlerte.emit({alert: this.alertFrequency});
  }

}

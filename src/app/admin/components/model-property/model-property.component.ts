import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModelProperty} from 'src/app/shared/models/modelProperty';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-model-property',
  templateUrl: './model-property.component.html'
})
export class ModelpropertyComponent implements OnInit {

  @Input() modelProperty: ModelProperty;
  @Input() index: number;
  @Input() modelindex: number;
  @Output() deleteModelProperty = new EventEmitter<ModelProperty>();
  typeList: SelectItem[];

  constructor() {

    this.typeList = [
      {label: 'Choisir un type', value: null},
      {label: 'Numérique', value: 'NUMERIC'},
      {label: 'Enumératif', value: 'ENUMERATIVE'}
    ];
  }


  ngOnInit() {
  }

  delete(modelProperty: ModelProperty) {
    this.deleteModelProperty.emit(modelProperty);
  }
}

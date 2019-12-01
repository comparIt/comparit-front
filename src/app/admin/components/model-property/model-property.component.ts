import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModelProperty} from 'src/app/shared/models/modelProperty';

@Component({
  selector: 'app-model-property',
  templateUrl: './model-property.component.html'
})
export class ModelpropertyComponent implements OnInit {

  @Input() modelProperty: ModelProperty;
  @Input() index: number;
  @Input() modelindex: number;
  @Output() deleteModelProperty = new EventEmitter<ModelProperty>();


  constructor() {
  }


  ngOnInit() {
  }

  delete(modelProperty: ModelProperty) {
    this.deleteModelProperty.emit(modelProperty);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {modelProperty } from 'src/app/shared/models/modelProperty';

@Component({
  selector: 'app-model-property',
  templateUrl: './model-property.component.html',
  styleUrls: ['./model-property.component.scss']
})
export class ModelpropertyComponent implements OnInit {

    @Input() modelProperty: modelProperty;
    @Input() index: number;
    @Output() deleteModelProperty = new EventEmitter<modelProperty>();


  constructor(
    ) {}

  ngOnInit() {
  }

  delete(modelProperty: modelProperty){
    this.deleteModelProperty.emit(modelProperty);
  }
  

}

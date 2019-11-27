import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Model} from 'src/app/shared/models/model';
import {ModelProperty} from 'src/app/shared/models/modelProperty';
import {modelProperty} from "../../../shared/models/modelProperty";


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  submitted = false;
  @Input() model: Model;
  @Input() index: number;
  @Input() modelindex: number;
  @Output() deleteModel = new EventEmitter<Model>();


  constructor() {
  }

  ngOnInit() {
    this.model.modelProperties.push(this.intiliazeModelProperty('', '', true, 'Enumerative', true, true, true));
    this.model.modelProperties.push(this.intiliazeModelProperty('', '', true, 'Enumerative', true, true, true));
    this.model.modelProperties.push(this.intiliazeModelProperty('', '', true, 'Numeric', true, true, true));
  }

  delete(model: Model) {
    this.deleteModel.emit(model);

  }

  createModelProprety(): ModelProperty {
    const modelProprety: ModelProperty = new ModelProperty('' , '', false, '', false, false, false , 0,0, []);
    return modelProprety;
  }

  addModelProperty() {
    this.model.modelProperties.push(this.createModelProprety());
  }

  deleteModelProperty(event: modelProperty) {
    this.model.modelProperties = this.model.modelProperties.filter(obj => obj !== event);
  }

  intiliazeModelProperty(name: string, technicalName: string, activated: boolean, type: string, filtrable: boolean, filtrableAdvanced: boolean, mandatory: boolean): ModelProperty {
    const modelProperty: ModelProperty = new ModelProperty(name, technicalName, activated, type, filtrable, filtrableAdvanced, mandatory, 0, 0, []);
    return modelProperty;
  }
}

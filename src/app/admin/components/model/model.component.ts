import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Model} from 'src/app/shared/models/model';
import {ModelProperty} from 'src/app/shared/models/modelProperty';


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
  }

  delete(model: Model) {
    this.deleteModel.emit(model);

  }

  createModelProprety(): ModelProperty {
    return new ModelProperty();
  }

  addModelProperty() {
    this.model.modelProperties.push(this.createModelProprety());
  }

  deleteModelProperty(event: ModelProperty) {
    this.model.modelProperties = this.model.modelProperties.filter(obj => obj !== event);
  }

}

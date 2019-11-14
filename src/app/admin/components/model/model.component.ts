import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Model } from 'src/app/shared/models/model';
import { modelProperty } from 'src/app/shared/models/modelProperty';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  submitted = false;
  @Input() model: Model;
  @Input() index: number;
  @Output() deleteModel = new EventEmitter<Model>();


 constructor() {
  }

    ngOnInit() {
      this.model.modelPropreties = [this.createModelProprety()];
    }

    delete(model: Model) {
      this.deleteModel.emit(model);
    }

    createModelProprety(): modelProperty {
      let modelProprety: modelProperty = new modelProperty;
      modelProprety.name = '';
      modelProprety.technicalName = '',
      modelProprety.isActivited =  false,
      modelProprety.filtrable = false,
      modelProprety.filtrableAdvanced = false;
      modelProprety.mandatory = false;
      return modelProprety;
    }

    addModelProperty() {
      this.model.modelPropreties.push(this.createModelProprety());
    }

    deleteModelProperty(event:modelProperty) {
      this.model.modelPropreties = this.model.modelPropreties.filter(obj => obj !== event);
    }

}

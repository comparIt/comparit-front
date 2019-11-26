import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Model } from 'src/app/shared/models/model';
import { ModelProperty } from 'src/app/shared/models/modelProperty';


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
      this.model.modelProperties.push(this.intiliazeModelProperty( '', '', true, 'Enumerative' , true, true, true));
      this.model.modelProperties.push(this.intiliazeModelProperty( '', '', true, 'Enumerative' , true, true, true));
      this.model.modelProperties.push(this.intiliazeModelProperty( '', '', true, 'Numeric' , true, true, true));
    }

    delete(model: Model) {
      this.deleteModel.emit(model);

    }


    addModelProperty() {
    }

    deleteModelProperty(event: ModelProperty) {
      this.model.modelProperties = this.model.modelProperties.filter(obj => obj !== event);
    }

    // tslint:disable-next-line: max-line-length
    intiliazeModelProperty(name: string, technicalName: string, activated: boolean, type: string, filtrable: boolean, filtrableAdvanced: boolean, mandatory: boolean): modelProperty {
    // tslint:disable-next-line: max-line-length
      const modelProprety: modelProperty = new modelProperty(name , technicalName, activated, type, filtrable, filtrableAdvanced, mandatory );
      return modelProprety;
    }
}

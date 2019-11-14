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
      this.model.modelPropreties.push(this.intiliazeModelProperty( 'Description', 'Description', true, 'Enumerative' , true, true, true));
      this.model.modelPropreties.push(this.intiliazeModelProperty( 'Prix', 'Prix', true, 'Numeric' , true, true, true));
    }

    delete(model: Model) {
      this.deleteModel.emit(model);
    }

    createModelProprety(): modelProperty {
      const modelProprety: modelProperty = new modelProperty('' , '', false, '', false, false, false );
      return modelProprety;
    }

    addModelProperty() {
      this.model.modelPropreties.push(this.createModelProprety());
    }

    deleteModelProperty(event: modelProperty) {
      this.model.modelPropreties = this.model.modelPropreties.filter(obj => obj !== event);
    }

    // tslint:disable-next-line: max-line-length
    intiliazeModelProperty(name: string, technicalName: string, isActivited: boolean, type: string, filtrable: boolean, filtrableAdvanced: boolean, mandatory: boolean): modelProperty {
    // tslint:disable-next-line: max-line-length
      const modelProprety: modelProperty = new modelProperty(name , technicalName, isActivited, type, filtrable, filtrableAdvanced, mandatory );
      return modelProprety;
    }
}

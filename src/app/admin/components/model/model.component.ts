import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Model} from 'src/app/shared/models/model';
import {ModelProperty} from 'src/app/shared/models/modelProperty';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['../../admin.component.scss']
})
export class ModelComponent implements OnInit {
  submitted = false;
  @Input() model: Model;
  @Input() index: number;
  @Input() modelindex: number;
  @Output() deleteModel = new EventEmitter<Model>();


  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
  }

  delete(model: Model) {
    this.deleteModel.emit(model);

  }

  addModelProperty() {
    const newModelProperty = new ModelProperty();
    newModelProperty.isSaved = false;
    this.model.modelProperties.push(newModelProperty);
  }

  deleteModelProperty(event: ModelProperty) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette propriété ?',
      accept: () => {
        this.model.modelProperties = this.model.modelProperties.filter(obj => obj !== event);
      }
    });
  }

}

import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Model } from 'src/app/shared/models/model';
import { Configuration } from 'src/app/shared/models/configuration';
import {GlobalConfigurationService} from 'src/app/shared/services/globalConfiguration.service';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  @Input() model: Model;
  @Input() index: number;
  @Output() deleteOutput = new EventEmitter<Model>();

 constructor(
    private formBuilder: FormBuilder,
    private globalconfigurationService: GlobalConfigurationService) {
  }

    ngOnInit() {
    }

    delete(model: Model){
      this.deleteOutput.emit(model);
    }

}

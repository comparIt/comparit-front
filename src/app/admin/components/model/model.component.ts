import { Component, OnInit, Input } from '@angular/core';
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

 constructor(
    private formBuilder: FormBuilder,
    private globalconfigurationService: GlobalConfigurationService) {
  }

    ngOnInit() {
        this.dynamicForm = this.formBuilder.group({
            numberOfModels: ['', Validators.required],
            Models: new FormArray([])
        });
    }
    // convenience getters for easy access to form fields
    get f() { return this.dynamicForm.controls; }
    get t() { return this.f.Models as FormArray; }
}

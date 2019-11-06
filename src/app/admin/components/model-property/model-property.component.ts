import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-model-property',
  templateUrl: './model-property.component.html',
  styleUrls: ['./model-property.component.scss']
})
export class ModelpropertyComponent implements OnInit {
    dynamicForm: FormGroup;
    

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfModels: ['', Validators.required],
      Models: new FormArray([])
  });
  }

  // convenience getters for easy access to form fields
get f() { return this.dynamicForm.controls; }
get t() { return this.f.Models as FormArray; }

onChangeModels(e) {
    const numberOfModels = e.target.value || 0;
    if (this.t.length < numberOfModels) {
        for (let i = this.t.length; i < numberOfModels; i++) {
            this.t.push(this.formBuilder.group({   
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfModels; i--) {
            this.t.removeAt(i);
        }
    }
}

}

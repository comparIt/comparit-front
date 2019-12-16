import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPropertyComponent } from './model-property.component';

describe('ModelPropretyComponent', () => {
  let component: ModelPropertyComponent;
  let fixture: ComponentFixture<ModelPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

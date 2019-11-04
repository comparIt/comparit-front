import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPropretyComponent } from './model-proprety.component';

describe('ModelPropretyComponent', () => {
  let component: ModelPropretyComponent;
  let fixture: ComponentFixture<ModelPropretyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPropretyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPropretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

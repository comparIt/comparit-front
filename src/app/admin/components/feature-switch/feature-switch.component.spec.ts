import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSwitchComponent } from './feature-switch.component';

describe('FeatureSwitchComponent', () => {
  let component: FeatureSwitchComponent;
  let fixture: ComponentFixture<FeatureSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

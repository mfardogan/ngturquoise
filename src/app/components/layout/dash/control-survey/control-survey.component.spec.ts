import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSurveyComponent } from './control-survey.component';

describe('ControlSurveyComponent', () => {
  let component: ControlSurveyComponent;
  let fixture: ComponentFixture<ControlSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

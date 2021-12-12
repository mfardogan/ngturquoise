import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstolSurveyJoinComponent } from './constol-survey-join.component';

describe('ConstolSurveyJoinComponent', () => {
  let component: ConstolSurveyJoinComponent;
  let fixture: ComponentFixture<ConstolSurveyJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstolSurveyJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstolSurveyJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

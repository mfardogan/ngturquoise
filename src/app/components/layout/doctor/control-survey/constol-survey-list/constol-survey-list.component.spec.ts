import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstolSurveyListComponent } from './constol-survey-list.component';

describe('ConstolSurveyListComponent', () => {
  let component: ConstolSurveyListComponent;
  let fixture: ComponentFixture<ConstolSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstolSurveyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstolSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

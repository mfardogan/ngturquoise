import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstrolSurveyViewComponent } from './constrol-survey-view.component';

describe('ConstrolSurveyViewComponent', () => {
  let component: ConstrolSurveyViewComponent;
  let fixture: ComponentFixture<ConstrolSurveyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstrolSurveyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstrolSurveyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

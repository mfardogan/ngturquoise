import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyActivityComponent } from './survey-activity.component';

describe('SurveyActivityComponent', () => {
  let component: SurveyActivityComponent;
  let fixture: ComponentFixture<SurveyActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

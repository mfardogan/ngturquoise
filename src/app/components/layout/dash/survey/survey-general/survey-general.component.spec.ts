import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyGeneralComponent } from './survey-general.component';

describe('SurveyGeneralComponent', () => {
  let component: SurveyGeneralComponent;
  let fixture: ComponentFixture<SurveyGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

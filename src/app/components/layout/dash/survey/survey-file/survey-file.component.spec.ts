import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFileComponent } from './survey-file.component';

describe('SurveyFileComponent', () => {
  let component: SurveyFileComponent;
  let fixture: ComponentFixture<SurveyFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

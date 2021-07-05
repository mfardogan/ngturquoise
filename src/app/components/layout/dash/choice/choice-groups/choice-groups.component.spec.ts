import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceGroupsComponent } from './choice-groups.component';

describe('ChoiceGroupsComponent', () => {
  let component: ChoiceGroupsComponent;
  let fixture: ComponentFixture<ChoiceGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceGroupItemComponent } from './choice-group-item.component';

describe('ChoiceGroupItemComponent', () => {
  let component: ChoiceGroupItemComponent;
  let fixture: ComponentFixture<ChoiceGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceGroupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

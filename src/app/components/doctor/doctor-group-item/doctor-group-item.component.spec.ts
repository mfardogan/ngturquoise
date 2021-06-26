import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGroupItemComponent } from './doctor-group-item.component';

describe('DoctorGroupItemComponent', () => {
  let component: DoctorGroupItemComponent;
  let fixture: ComponentFixture<DoctorGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorGroupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

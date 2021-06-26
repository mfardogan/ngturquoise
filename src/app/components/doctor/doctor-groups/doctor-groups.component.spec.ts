import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGroupsComponent } from './doctor-groups.component';

describe('DoctorGroupsComponent', () => {
  let component: DoctorGroupsComponent;
  let fixture: ComponentFixture<DoctorGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

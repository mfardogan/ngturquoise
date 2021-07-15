import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorNavBarComponent } from './doctor-nav-bar.component';

describe('DoctorNavBarComponent', () => {
  let component: DoctorNavBarComponent;
  let fixture: ComponentFixture<DoctorNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

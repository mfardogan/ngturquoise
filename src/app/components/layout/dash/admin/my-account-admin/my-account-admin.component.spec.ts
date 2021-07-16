import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountAdminComponent } from './my-account-admin.component';

describe('MyAccountAdminComponent', () => {
  let component: MyAccountAdminComponent;
  let fixture: ComponentFixture<MyAccountAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

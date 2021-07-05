import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthLayoutComponent } from './no-auth-layout.component';

describe('NoAuthLayoutComponent', () => {
  let component: NoAuthLayoutComponent;
  let fixture: ComponentFixture<NoAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAuthLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

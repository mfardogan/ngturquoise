import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Doctor from 'src/app/@core/models/doctor';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import { Dependency } from 'src/app/app.module';
import DoctorHttp from '../doctor-http';

@Component({
  selector: 'doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  constructor(
    private rout: Router,
    private router: ActivatedRoute
  ) { }

  private id!: number;
  private avatarClassNames: Array<string> = [
    'avatar avatar-xxl avatar-soft-dark avatar-circle',
    'avatar avatar-xxl avatar-soft-info avatar-circle',
    'avatar avatar-xxl avatar-soft-danger avatar-circle'
  ];

  data: Doctor = new Doctor();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);
      Dependency.get(DoctorHttp).get(this.id).subscribe(
        (data: Doctor) => {
          this.data = data;
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
          }
        }); //HttpInterceptor
    }
  }

  getAvatarClassNameByGender(gender?: number): string {
    const to = gender! <= 2 ? gender : gender! % 3;
    return this.avatarClassNames[to!];
  }

  canEdit() {
    const tokenService = Dependency.get(TokenServiceService);

    if (tokenService.isDoctor()) {
      const doctor = tokenService.getDoctorId();
      return this.data.id == doctor;
    }
    return false;
  }

  logout() {
    Dependency.get(TokenServiceService).clearToken();
    this.rout.navigate(['/signin']);
  }
}

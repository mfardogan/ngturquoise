import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from 'src/app/@core/models/doctor';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import DoctorHttp from '../../dash/doctor/doctor-http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  data: Doctor = new Doctor();
  private avatarClassNames: Array<string> = [
    'avatar avatar-xxl avatar-soft-dark avatar-circle',
    'avatar avatar-xxl avatar-soft-info avatar-circle',
    'avatar avatar-xxl avatar-soft-danger avatar-circle'
  ];

  constructor(
    private router: Router,
    private doctorHttpService: DoctorHttp,
    private tokenService: TokenServiceService) { }

  ngOnInit(): void {
    const id = this.tokenService.getDoctorId();
    this.doctorHttpService.get(id).subscribe((doctor: Doctor) => {
      this.data = doctor;
    })
  }

  getAvatarClassNameByGender(gender?: number): string {
    const to = gender! <= 2 ? gender : gender! % 3;
    return this.avatarClassNames[to!];
  }

  canEdit() {

    if (this.tokenService.isDoctor()) {
      const doctor = this.tokenService.getDoctorId();
      return this.data.id == doctor;
    }
    return false;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/signin']);
  }
}

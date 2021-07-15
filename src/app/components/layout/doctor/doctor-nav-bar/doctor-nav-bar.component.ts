import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from 'src/app/@core/models/doctor';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import DoctorHttp from '../../dash/doctor/doctor-http';

@Component({
  selector: 'doctor-nav-bar',
  templateUrl: './doctor-nav-bar.component.html',
  styleUrls: ['./doctor-nav-bar.component.css']
})
export class DoctorNavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private doctorHttpService: DoctorHttp,
    private tokenService: TokenServiceService
  ) { }

  doctor: Doctor = new Doctor();

  ngOnInit(): void {
    const id = this.tokenService.getDoctorId();
    this.doctorHttpService.get(id).subscribe((doctor: Doctor) => {
      this.doctor = doctor;
    });
  }

  signout() {
    this.tokenService.clearToken();
    this.router.navigate(['/signin']);
  }
}

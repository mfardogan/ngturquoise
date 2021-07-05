import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from 'src/app/@core/models/doctor';
import { Dependency } from 'src/app/app.module';
import DoctorHttp from '../../dash/doctor/doctor-http';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  constructor(
    private router: Router,
    private doctorHttpService: DoctorHttp
  ) { }

  passwordConfirm: string = '';
  data: Doctor = new Doctor();

  ngOnInit(): void {
  }

  save(): void {
    this.doctorHttpService
      .add(this.data)
      .subscribe((e: any) => {
        this.router.navigate(['/signin']);
      });
  }
}

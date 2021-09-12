import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Doctor from 'src/app/@core/models/doctor';
import DoctorHttp from '../../dash/doctor/doctor-http';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private doctorHttpService: DoctorHttp
  ) { }

  passwordConfirm: string = '';
  data: Doctor = new Doctor();

  ngOnInit(): void {
  }

  save(): void {
    if (this.data.email == '') {
      this.toastr.warning("Email alanı zorunludur!", "Dikkat!");
      return;
    }

    if (this.data.name == '') {
      this.toastr.warning("İsim alanı zorunludur!", "Dikkat!");
      return;
    }

    if (this.data.surname == '') {
      this.toastr.warning("Soyisim alanı zorunludur!", "Dikkat!");
      return;
    }


    if (this.data.password == '') {
      this.toastr.warning("Şifre alanı zorunludur!", "Dikkat!");
      return;
    }

    if (this.data.password != this.passwordConfirm) {
      this.toastr.warning("Şifreler eşleşmedi!", "Dikkat!");
      return;
    }

    this.doctorHttpService
      .add(this.data)
      .subscribe((e: any) => {
        this.router.navigate(['/signin']);
      });
  }
}

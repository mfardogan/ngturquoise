import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ChangePassword from 'src/app/@core/models/change-password';
import Doctor from 'src/app/@core/models/doctor';
import { Dependency } from 'src/app/app.module';
import DoctorHttp from '../../dash/doctor/doctor-http';

@Component({
  selector: 'edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent implements OnInit {

  constructor(
    private router: ActivatedRoute
  ) { }

  title: string = '';
  name: string = '';
  surname: string = '';
  data: Doctor = new Doctor();
  passwordScore: number = 0;
  password: ChangePassword = new ChangePassword();
  selectedFile: string = '';

  myForm = new FormGroup({
    file: new FormControl('file', [Validators.required]),
    fileSource: new FormControl('file', [Validators.required])
  });

  private avatarClassNames: Array<string> = [
    'avatar avatar-xxl avatar-soft-dark avatar-circle',
    'avatar avatar-xxl avatar-soft-info avatar-circle',
    'avatar avatar-xxl avatar-soft-danger avatar-circle'
  ];


  ngOnInit(): void {
    Dependency.get(DoctorHttp)
      .getmyinfo()
      .subscribe((data: Doctor) => {
        this.data = data;
        this.title = data.title;
        this.name = data.name;
        this.surname = data.surname;
      });
  }

  getAvatarClassNameByGender(gender?: number): string {
    return this.avatarClassNames[gender!];
  }

  setBasicInfo() {
    Dependency.get(DoctorHttp)
      .setBasicInfo(this.data)
      .subscribe(e => {
        this.name = this.data.name;
        this.surname = this.data.surname;
        this.title = this.data.title;
      });
  }

  setPassword() {
    if (this.password.change == '' || this.password.change != this.password.changeConfirm) {
    }

    Dependency.get(DoctorHttp)
      .changePassword(this.password)
      .subscribe(e => {
        this.passwordScore = 0;
        this.password = new ChangePassword();
      });
  }

  passstrenth() {
    const password = this.password.change;
    if (password.length < 5) {
      this.passwordScore = 0;
      this.passwordScore = 0;
    }
    this.passwordScore = Math.floor(Math.random() * 100);
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file.name;
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submitAvatar() {
    if (this.selectedFile == '' || this.selectedFile == undefined) {
      return;
    }

    const service: DoctorHttp = Dependency.get(DoctorHttp);
    const data = new FormData();
    const file = this.myForm.get('fileSource')?.value;
    data.append('file', file);

    service.changeAvatar(data)
      .subscribe(e => {
        service.getmyinfo()
          .subscribe((data: Doctor) => {
            this.data.image = data.image;
            this.selectedFile = '';
          });
      });
  }

  setGender(val: number, event: any) {
    if (event.target.checked) {
      this.data.gender = val;
    }
  }

  removeMyAvatar() {
    const http: DoctorHttp = Dependency.get(DoctorHttp);
    if (this.data.image == null) { return };

    http.removeMyAvatar()
      .subscribe(e => {
        http
          .getmyinfo()
          .subscribe((data: Doctor) => {
            this.data = data;
          });
      });
  }

}

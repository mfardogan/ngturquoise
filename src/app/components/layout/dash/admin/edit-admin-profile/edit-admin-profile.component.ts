import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Administrator from 'src/app/@core/models/administrator';
import ChangePassword from 'src/app/@core/models/change-password';
import { Dependency } from 'src/app/app.module';
import AdminHttp from '../admin-http';

@Component({
  selector: 'edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css']
})
export class EditAdminProfileComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
  ) { }

  title: string = '';
  name: string = '';
  surname: string = '';
  data: Administrator = new Administrator();
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
    Dependency.get(AdminHttp)
      .getmyinfo()
      .subscribe((data: Administrator) => {
        this.data = data;
        this.title = data.title;
        this.name = data.name;
        this.surname = data.surname;
      });
  }

  getAvatarClassNameByGender(gender: number): string {
    const to: number = gender <= 2 ? gender : gender % 3;
    return this.avatarClassNames[to];
  }

  setBasicInfo() {
    Dependency.get(AdminHttp)
      .setBasicInfo(this.data)
      .subscribe(e => {
        this.name = this.data.name;
        this.surname = this.data.surname;
        this.title = this.data.title;
        this.toastr.success("Profil bilgileri güncellendi!", "Dikkat!");
      });
  }

  setPassword() {
    if (this.password.change == '' || this.password.change != this.password.changeConfirm) {
      this.toastr.warning("Şifreler eşleşmedi!", "Dikkat!");
    }

    Dependency.get(AdminHttp)
      .changePassword(this.password)
      .subscribe(e => {
        this.passwordScore = 0;
        this.password = new ChangePassword();
        this.toastr.success("Şifreler değiştirme işlemi yapıldı!", "Dikkat!");
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

    const service: AdminHttp = Dependency.get(AdminHttp);

    const data = new FormData();
    const file = this.myForm.get('fileSource')?.value;
    data.append('file', file);

    service.changeAvatar(data)
      .subscribe(e => {
        service.getmyinfo()
          .subscribe((data: Administrator) => {
            this.data.image = data.image;
            this.selectedFile = '';
            this.toastr.success("Profil resmi değiştirme işlemi yapıldı!", "Dikkat!");
          });
      });
  }

  setGender(gender: number, event: any) {
    if (event.target.value) {
      this.data.gender = gender;
    }
  }

  removeMyAvatar() {
    const http: AdminHttp = Dependency.get(AdminHttp);
    if (this.data.image == null) { return };

    http.clearAvatar()
      .subscribe(e => {
        http
          .getmyinfo()
          .subscribe((data: Administrator) => {
            this.data = data;
            this.toastr.success("Profil resmi kaldırma işlemi yapıldı!", "Dikkat!");
          });
      });
  }
}

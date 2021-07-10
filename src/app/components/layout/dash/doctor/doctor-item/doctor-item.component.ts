import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Doctor from 'src/app/@core/models/doctor';
import ModifyAdminPassword from 'src/app/@core/models/modify-admin-pass';
import { Dependency } from 'src/app/app.module';
import DoctorHttp from '../doctor-http';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.css']
})
export class DoctorItemComponent implements OnInit {

  id: number = 0;
  data: Doctor = new Doctor();
  clearedAvatar: boolean = false;
  passwordChangeConfirm: string = '';
  passwordScore: number = 0;
  confirmToDelete: boolean = false;
  modiftPassword: ModifyAdminPassword = new ModifyAdminPassword();

  constructor(
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);
      this.modiftPassword.id = this.id;
      Dependency.get(DoctorHttp).get(this.id).subscribe(
        (data: Doctor) => {
          this.data = data;
        });
    }
  }

  setGender(gender: number, event: any) {
    if (event.target.value) {
      this.data.gender = gender;
    }
  }

  setBasicInfo() {
    if (this.id > 0) {
      Dependency.get(DoctorHttp)
        .update(this.data)
        .subscribe(() => {
          this.route.navigate(['/dash/doctors']);
        })
    } else {
      console.log(this.data);
      Dependency.get(DoctorHttp)
        .add(this.data)
        .subscribe(() => {
          this.route.navigate(['/dash/doctors']);
        })
    }
  }

  hasImage() {
    return this.id > 0 && this.data.image != null;
  }

  clearAvatar() {
    Dependency.get(DoctorHttp)
      .clearDoctorAvatarById(this.id)
      .subscribe(() => {
        this.clearedAvatar = true;
      });
  }

  passstrenth() {
    const password = this.modiftPassword.newPassword;
    if (password.length < 5) {
      this.passwordScore = 0;
      this.passwordScore = 0;
    }
    this.passwordScore = Math.floor(Math.random() * 100);
  }

  remove() {
    if (!this.confirmToDelete) {
      return;
    }

    Dependency.get(DoctorHttp)
      .remove(this.id).subscribe(() => {
        this.route.navigate(['/dash/doctors']);
      });
  }

  setType(type: number, event: any) {
    if (event.target.value) {
      this.data.type = type;
    }
  }

  changeDoctorType() {
    Dependency.get(DoctorHttp)
      .changeType(this.id, this.data.type)
      .subscribe(e => {
        this.route.navigate(['/dash/doctors']);
      });
  }

  modifyPassword() {
    if (this.passwordChangeConfirm != this.modiftPassword.newPassword) {
      console.log("Şifreler eşleşmedi!");
      return;
    }

    Dependency.get(DoctorHttp)
      .modifyPasswordByAdmin(this.modiftPassword)
      .subscribe(() => {
        this.route.navigate(['/dash/doctors']);
      });
  }
}

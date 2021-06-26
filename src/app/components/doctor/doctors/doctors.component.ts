import { Component, OnInit } from '@angular/core';
import Doctor from 'src/app/@core/models/doctor';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import DoctorHttp from '../doctor-http';

@Component({
  selector: 'doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css', '../../../../../src/assets/vendor/select2/dist/css/select2.min.css']
})
export class DoctorsComponent implements OnInit {

  data: Array<Doctor> = [];
  search: Search<Doctor> = new Search();

  constructor() { }

  ngOnInit(): void {
    Dependency.get(DoctorHttp)
      .search(this.search)
      .subscribe((data: Array<Doctor>) => {
        this.data = data;
        console.log(data);
      })
  }

  confirm(id: number): void {
    const doctor: Doctor = this.data.filter(e => e.id === id)[0];
    if (doctor === undefined || doctor.isConfirmed) {
      return;
    }

    Dependency.get(DoctorHttp)
      .confirm(id)
      .subscribe((x: any) => {
        doctor.isConfirmed = true;
      })
  }

  getAvatarClassNameByGender(gender: number): string {
    return gender == 0 ? 'avatar avatar-soft-dark avatar-circle' : gender == 1 ?
      'avatar avatar-soft-info avatar-circle' :
      'avatar avatar-soft-danger avatar-circle';
  }

  changeDoctorType(id: number, type: string) {
    const to = Number(type);
    Dependency.get(DoctorHttp)
      .changeType(id, to)
      .subscribe(e => { });
  }

  getActivityPercentClass(id: number): string {
    const doctor: Doctor = this.data.filter(e => e.id === id)[0];
    const activity = doctor.activityPercent;
   
    if (activity >= 0 && activity <= 40) {
      return 'progress-bar bg-danger';
    }
    if (activity > 40 && activity <= 70) {
      return 'progress-bar bg-primary';
    }
    return 'progress-bar bg-success';
  }
}

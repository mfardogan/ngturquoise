import { Component, OnInit } from '@angular/core';
import Doctor from 'src/app/@core/models/doctor';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import DoctorHttp from '../doctor-http';

@Component({
  selector: 'doctors',
  templateUrl: './doctors.component.html',
  styleUrls: [
    './doctors.component.css',
    '../../../../../../assets/vendor/select2/dist/css/select2.min.css'
  ]
})
export class DoctorsComponent implements OnInit {

  constructor(
    private doctorHttp: DoctorHttp
  ) { }

  data: Array<Doctor> = [];
  filterClauses: Doctor = new Doctor();
  search: Search<Doctor> = new Search();

  /**
   * Prepare
   */
  ngOnInit(): void {
    this.getNextPageOfDoctors();
  }

  /**
   * Get next page
   */
  getNextPageOfDoctors(): void {
    this.doctorHttp.search(this.search)
      .subscribe((data: Array<Doctor>) => {
        this.data = data;
      })
  }

  confirm(id: number): void {
    const doctor: Doctor = this.data.filter(e => e.id === id)[0];
    if (doctor === undefined || doctor.isConfirmed) {
      return;
    }

    this.doctorHttp.confirm(id)
      .subscribe((x: any) => {
        doctor.isConfirmed = true;
      })
  }

  getAvatarClassNameByGender(gender?: number): string {
    return gender == 0 ? 'avatar avatar-soft-dark avatar-circle' : gender == 1 ?
      'avatar avatar-soft-info avatar-circle' :
      'avatar avatar-soft-danger avatar-circle';
  }

  changeDoctorType(id: number, type: string) {
    const to = Number(type);
    this.doctorHttp.changeType(id, to)
      .subscribe(e => {

      });
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

  /**
   * Apply filters
   */
  apply(): void {
    this.search = new Search<Doctor>();
    this.search.filter = this.filterClauses;
    this.getNextPageOfDoctors();
  }

  /**
   * Clear filters
   */
  clear(): void {
    console.log(this.filterClauses);
    this.filterClauses = new Doctor();
    this.search = new Search<Doctor>();
    this.getNextPageOfDoctors();

  }

  setGender(i: number) {
    this.search.filter.gender = 2;
  }
}

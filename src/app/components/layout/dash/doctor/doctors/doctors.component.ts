import { Component, OnInit } from '@angular/core';
import Doctor from 'src/app/@core/models/doctor';
import DoctorSearch from 'src/app/@core/models/doctor-search';
import DoctorSummary from 'src/app/@core/models/doctor-summary';
import Search from 'src/app/@core/models/search';
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
  summary: DoctorSummary = new DoctorSummary();
  filterClauses: DoctorSearch = new DoctorSearch();
  search: Search<DoctorSearch> = new Search();

  /**
   * Prepare
   */
  ngOnInit(): void {
    this.getSummary();
    this.getNextPageOfDoctors();
  }

  getSummary(): void {
    this.doctorHttp.getSummary().subscribe((summary: DoctorSummary) => {
      this.summary = summary;
    });
  }

  /**
   * Get next page
   */
  getNextPageOfDoctors(): void {
    this.doctorHttp.searchDoctors(this.search)
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
    console.log(JSON.stringify(this.filterClauses))
    this.search.pagination.page = 1;
    this.search.filter = this.filterClauses;
    this.getNextPageOfDoctors();
  }

  /**
   * Clear filters
   */
  clear(): void {
    this.filterClauses = new DoctorSearch();
    this.search = new Search<DoctorSearch>();
    this.getNextPageOfDoctors();
  }

  /**
   * Change search's gender parameter
   * @param gender Gender
   * @param event Event
   */
  setGender(gender: number, event: any) {
    if (event.target.value) {
      if (gender == -1) this.filterClauses.gender = undefined;
      else this.filterClauses.gender = gender;
    }
  }
}

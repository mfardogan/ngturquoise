import { Component, OnInit } from '@angular/core';
import DoctorGroup from 'src/app/@core/models/doctor-group';
import Pagination from 'src/app/@core/models/pagination';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import DoctorGroupHttp from '../doctor-group-http';

@Component({
  selector: 'doctor-groups',
  templateUrl: './doctor-groups.component.html',
  styleUrls: ['./doctor-groups.component.css', '../../../../../src/assets/vendor/select2/dist/css/select2.min.css']
})
export class DoctorGroupsComponent implements OnInit {

  constructor() { }

  private classNames: Array<string> = [
    'badge badge-soft-info p-2',
    'badge badge-soft-primary p-2',
    'badge badge-soft-dark p-2',
    'badge badge-soft-danger p-2'
  ];

  data: Array<DoctorGroup> = [];
  search: Search<DoctorGroup> = new Search<DoctorGroup>();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.search.pagination = new Pagination(1, 999);
    Dependency.get(DoctorGroupHttp).search(this.search)
      .subscribe((data: Array<DoctorGroup>) => {
        this.data = data;
        console.log(this.data);
      });
  }

  remove(id: number): void {
    Dependency.get(DoctorGroupHttp).remove(id).subscribe(x => {
      const sequence: number = this.data.findIndex(e => e.id == id);
      this.data.splice(sequence, 1);
    });
  }

  markAsDefault(id: number): void {
    Dependency.get(DoctorGroupHttp).markAsDefault(id)
      .subscribe((e: any) => {
        this.data.forEach(element => {
          element.default = element.id == id;
        });
      });
  }

  getDoctorGroupsCount(): number {
    return this.data === undefined ? 0 : this.data.length;
  }

  getBadgeClass(): string {
    const sequence = Math.floor((Math.random() * this.classNames.length));
    return this.classNames[sequence];
  }

  getNoMemberDoctorGroupsCount(): number {
    return this.data.filter(e => e.doctorCount === 0).length;
  }

  getMemberDoctorGroupsCount(): number {
    return this.data.filter(e => e.doctorCount > 0).length;
  }

  getNoMemberPercent(): number {
    return 100 * this.getNoMemberDoctorGroupsCount() / this.getDoctorGroupsCount();
  }

  getMemberPercent(): number {
    return 100 * this.getMemberDoctorGroupsCount() / this.getDoctorGroupsCount();
  }
}

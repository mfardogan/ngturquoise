import { Component, OnInit } from '@angular/core';
import Administrator from 'src/app/@core/models/administrator';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import AdminHttp from '../admin-http';

@Component({
  selector: 'admins',
  templateUrl: './admins.component.html',
  styleUrls: [
    './admins.component.css',
    '../../../../../src/assets/vendor/select2/dist/css/select2.min.css'
  ]
})
export class AdminsComponent implements OnInit {

  constructor() { }

  data: Array<Administrator> = [];
  search: Search<Administrator> = new Search<Administrator>();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    Dependency.get(AdminHttp)
      .search(this.search)
      .subscribe((data: Array<Administrator>) => {
        this.data = data;
      })
  }

  getAvatarClassNameByGender(gender: number): string {
    return gender == 0 ? 'avatar avatar-soft-dark avatar-circle' : gender == 1 ?
      'avatar avatar-soft-info avatar-circle' :
      'avatar avatar-soft-danger avatar-circle';
  }
}

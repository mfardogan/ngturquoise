import { Component, OnInit } from '@angular/core';
import Administrator from 'src/app/@core/models/administrator';
import CountViewModel from 'src/app/@core/models/countViewModel';

import Search from 'src/app/@core/models/search';
import SearchAdmin from 'src/app/@core/models/search-admin';
import { PaginationService } from 'src/app/@core/services/pagination.service';
import AdminHttp from '../admin-http';

@Component({
  selector: 'admins',
  templateUrl: './admins.component.html',
  styleUrls: [
    './admins.component.css',
    '../../../../../../assets/vendor/select2/dist/css/select2.min.css'
  ]
})
export class AdminsComponent implements OnInit {

  constructor(
    private adminHttp: AdminHttp,
    private paginationService: PaginationService
  ) { }

  totalPages: number = 0;
  paginations: Array<number> = [];
  data: Array<Administrator> = [];
  filterClauses: SearchAdmin = new SearchAdmin();
  search: Search<SearchAdmin> = new Search<SearchAdmin>();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getTotalRowCount();
    this.getNextPageOfAdministrators();


  }

  getTotalRowCount() {
    this.adminHttp.getCount(this.search.filter)
      .subscribe((e: CountViewModel) => {
        this.totalPages = e.count

        const activePage: number = this.search.pagination.page;
        this.paginations = this.paginationService.getPages(activePage, this.totalPages);
        console.log(this.paginations);
      });
  }

  getPage(page: number) {
    this.search.pagination.page = page;
    this.search.filter = this.filterClauses;
    this.getNextPageOfAdministrators();
  }

  /**
  * Get next page
  */
  getNextPageOfAdministrators(): void {
    this.adminHttp.searchAdministrators(this.search)
      .subscribe((data: Array<Administrator>) => {
        this.data = data;
      })
  }


  getAvatarClassNameByGender(gender: number): string {
    return gender == 0 ? 'avatar avatar-soft-dark avatar-circle' : gender == 1 ?
      'avatar avatar-soft-info avatar-circle' :
      'avatar avatar-soft-danger avatar-circle';
  }

  /**
     * Apply filters
     */
  apply(): void {
    this.search.pagination.page = 1;
    this.search.filter = this.filterClauses;
    this.getTotalRowCount();
    this.getNextPageOfAdministrators();
  }

  /**
   * Clear filters
   */
  clear(): void {
    this.filterClauses = new SearchAdmin();
    this.search = new Search<SearchAdmin>();
    this.getNextPageOfAdministrators();
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

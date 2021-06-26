import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Administrator from 'src/app/@core/models/administrator';
import Pagination from 'src/app/@core/models/pagination';
import SearchActivity from 'src/app/@core/models/search-activity';
import SurveyActivity from 'src/app/@core/models/surve-activity';
import { Dependency } from 'src/app/app.module';
import SurveyHttp from '../../survey/survey-http';
import AdminHttp from '../admin-http';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(
    private router: ActivatedRoute
  ) { }

  private id!: number;
  private avatarClassNames: Array<string> = [
    'avatar avatar-xxl avatar-soft-dark avatar-circle',
    'avatar avatar-xxl avatar-soft-info avatar-circle',
    'avatar avatar-xxl avatar-soft-danger avatar-circle'
  ];

  data: Administrator = new Administrator();
  activity: Array<SurveyActivity> = [];
  activityPageNumber: number = 1;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);

      Dependency.get(AdminHttp).get(this.id).subscribe(
        (data: Administrator) => {
          this.data = data;
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
          }
        }); //HttpInterceptor

      this.getAdministratorActivities();

    }
  }

  getAdministratorActivities(): void {
    const searchActivity = new SearchActivity();
    searchActivity.creator = this.id;
    searchActivity.pagination = new Pagination(this.activityPageNumber, 10);

    Dependency.get(SurveyHttp)
      .getActivity(searchActivity)
      .subscribe((activity: SurveyActivity[]) => {
        this.activity = activity;
        console.log(this.activity);
      })
  }

  getAvatarClassNameByGender(gender: number): string {
    const to: number = gender <= 2 ? gender : gender % 3;
    return this.avatarClassNames[to];
  }

}

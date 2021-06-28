import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Administrator from 'src/app/@core/models/administrator';
import Pagination from 'src/app/@core/models/pagination';
import SearchActivity from 'src/app/@core/models/search-activity';
import SurveyActivity from 'src/app/@core/models/surve-activity';
import Survey from 'src/app/@core/models/survey';
import SurveyByCreator from 'src/app/@core/models/survey-by-creator';
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
  private activiyPage: number = 0;
  private avatarClassNames: Array<string> = [
    'avatar avatar-xxl avatar-soft-dark avatar-circle',
    'avatar avatar-xxl avatar-soft-info avatar-circle',
    'avatar avatar-xxl avatar-soft-danger avatar-circle'
  ];

  profile: boolean = true;
  surveys: Array<Survey> = [];
  activity: Array<SurveyActivity> = [];
  data: Administrator = new Administrator();

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

      this.nextPageOfActivity();
      this.nextPageOfProjectHistory();
    }
  }


  nextPageOfProjectHistory(): void {
    const searchByCreator = new SurveyByCreator();
    searchByCreator.administratorId = this.id;
    searchByCreator.pagination = new Pagination(1, 5);

    Dependency.get(SurveyHttp)
      .byCreator(searchByCreator)
      .subscribe((surveys: Survey[]) => {
        this.surveys = surveys;
        console.log(surveys);
      });
  }

  nextPageOfActivity(): void {
    const searchActivity = new SearchActivity();
    searchActivity.creator = this.id;
    searchActivity.pagination = new Pagination(++this.activiyPage, 4);

    Dependency.get(SurveyHttp)
      .getActivity(searchActivity)
      .subscribe((activity: SurveyActivity[]) => {
        this.activity = this.activity.concat(activity);
      });
  }

  getAvatarClassNameByGender(gender: number): string {
    const to: number = gender <= 2 ? gender : gender % 3;
    return this.avatarClassNames[to];
  }

  getProgressPercentClass(id: number): string {
    const survey: Survey = this.surveys.filter(e => e.id === id)[0];
    const activity = survey.progressPercent;

    if (activity >= 0 && activity <= 40) {
      return 'progress-bar bg-danger';
    }
    if (activity > 40 && activity <= 70) {
      return 'progress-bar bg-primary';
    }
    return 'progress-bar bg-success';
  }

  showProfile() {
    this.profile = true;
  }

  showSurveys() {
    this.profile = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Administrator from 'src/app/@core/models/administrator';
import Pagination from 'src/app/@core/models/pagination';
import SearchActivity from 'src/app/@core/models/search-activity';
import SurveyActivity from 'src/app/@core/models/surve-activity';
import Survey from 'src/app/@core/models/survey';
import SurveyByCreator from 'src/app/@core/models/survey-by-creator';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import SurveyHttp from '../../survey/survey-http';
import AdminHttp from '../admin-http';

@Component({
  selector: 'my-account-admin',
  templateUrl: './my-account-admin.component.html',
  styleUrls: ['./my-account-admin.component.css']
})
export class MyAccountAdminComponent implements OnInit {

  constructor(
    private rout: Router,
    private adminHttpService: AdminHttp,
    private surveyHttpService: SurveyHttp,
    private tokenService: TokenServiceService,
    private router: ActivatedRoute
  ) { }

  private id!: number;
  private activiyPage: number = 0;
  private surveysPage: number = 0;

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

    const id = this.tokenService.getAdminId();
    if (!(id == undefined)) {
      this.id = Number(id);

      this.adminHttpService.get(this.id).subscribe(
        (data: Administrator) => {
          this.data = data;
        });

      this.nextPageOfActivity();
      this.nextPageOfProjectHistory();
    }
  }


  nextPageOfProjectHistory(): void {
    const search = new SurveyByCreator();
    search.administratorId = this.id;
    search.pagination = new Pagination(++this.surveysPage, 5);

    this.surveyHttpService.byCreator(search)
      .subscribe((surveys: Survey[]) => {
        this.surveys = this.surveys.concat(surveys);
      });
  }

  nextPageOfActivity(): void {
    const search = new SearchActivity();
    search.creator = this.id;
    search.pagination = new Pagination(++this.activiyPage, 5);

    this.surveyHttpService.getActivity(search)
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

  canEdit(): boolean {
    return this.tokenService.isAdmin() && this.data.id == this.tokenService.getAdminId();
  }

  logout() {
    this.tokenService.clearToken();
    this.rout.navigate(['/signin/admin']);
  }
}

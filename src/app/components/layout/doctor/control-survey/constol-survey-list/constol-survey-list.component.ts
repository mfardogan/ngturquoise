import { Component, OnInit } from '@angular/core';
import ControlSurvey from 'src/app/@core/models/control-survey';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import ControlSurveyHttp from '../../../dash/control-survey/control-survey-http';

@Component({
  selector: 'app-constol-survey-list',
  templateUrl: './constol-survey-list.component.html',
  styleUrls: ['./constol-survey-list.component.css']
})
export class ConstolSurveyListComponent implements OnInit {

  constructor() { }

  page: number = 1;
  data: Array<ControlSurvey> = [];
  search: Search<ControlSurvey> = new Search<ControlSurvey>();

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData(page: number = 1): void {
    this.page = this.search.pagination.page = page;
    Dependency.get(ControlSurveyHttp)
      .search(this.search)
      .subscribe(e => {
        e.forEach(x => this.data.push(x));
      });
  }

  nextPage = (): void => this.getPageData(this.page + 1);
}

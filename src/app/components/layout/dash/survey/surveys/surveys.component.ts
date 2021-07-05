import { Component, OnInit } from '@angular/core';
import Search from 'src/app/@core/models/search';
import Survey from 'src/app/@core/models/survey';
import SurveySummary from 'src/app/@core/models/survey-summary';
import { Dependency } from 'src/app/app.module';
import SurveyHttp from '../survey-http';

@Component({
  selector: 'surveys',
  templateUrl: './surveys.component.html',
  styleUrls: [
    './surveys.component.css',
    '../../../../../../assets/vendor/select2/dist/css/select2.min.css'
  ]
})
export class SurveysComponent implements OnInit {

  constructor() { }

  data: Array<Survey> = [];
  search: Search<Survey> = new Search<Survey>();
  summary: SurveySummary = new SurveySummary();

  ngOnInit(): void {
    this.search.pagination.rows = 10;
    this.getSummary();
    this.getSurveysBySearch();
  }

  getSummary(): void {
    Dependency.get(SurveyHttp)
      .getSummary()
      .subscribe((summary: SurveySummary) => {
        this.summary = summary;
      });
  }

  getSurveysBySearch(): void {
    Dependency.get(SurveyHttp)
      .search(this.search)
      .subscribe((data: Survey[]) => {
        this.data = data;
      });
  }

  nextPage() {
    this.search.pagination.page++;
    this.getSurveysBySearch();
  }

  previousPage() {
    if (this.search.pagination.page == 1) {
      return;
    }

    this.search.pagination.page--;
    this.getSurveysBySearch();
  }
}
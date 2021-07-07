import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Survey from 'src/app/@core/models/survey';
import { Dependency } from 'src/app/app.module';
import SurveyHttp from '../survey-http';

@Component({
  selector: 'survey-item',
  templateUrl: './survey-item.component.html',
  styleUrls: ['./survey-item.component.css']
})
export class SurveyItemComponent implements OnInit {

  constructor(
    private surveyHttp: SurveyHttp,
    private route: ActivatedRoute
  ) { }

  survey: number = 0;
  page: number = 1;
  data: Survey = new Survey();

  ngOnInit(): void {
    const survey = this.route.snapshot.paramMap.get('id');
    if (!(survey == undefined || survey == '')) {
      this.survey = Number(survey);

      this.surveyHttp
        .get(this.survey)
        .subscribe(e => {
          this.data = e;
          console.log(this.data);
        });
    }
  }

  changePage(tab: number) {
    this.page = tab;
  }
}

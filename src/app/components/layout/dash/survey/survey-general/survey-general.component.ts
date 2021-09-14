import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Answer from 'src/app/@core/models/answer';
import LastAnswersBySurvey from 'src/app/@core/models/last-answers-by-survey';
import Survey from 'src/app/@core/models/survey';
import { Dependency } from 'src/app/app.module';
import AnswerHttp from '../../answer/answer-http';
import SurveyHttp from '../survey-http';

@Component({
  selector: 'survey-general',
  templateUrl: './survey-general.component.html',
  styleUrls: ['./survey-general.component.css']
})
export class SurveyGeneralComponent implements OnInit {

  constructor(
  ) { }

  @Input() survey!: Survey

  answers: Answer[] = [];
  search: LastAnswersBySurvey = new LastAnswersBySurvey();

  ngOnInit(): void {
    this.search.surveyId = this.survey.id;
    this.search.pagination.page = 1;
    this.search.pagination.rows = 5;
    this.getLastAnswers();
  }

  downloadStatistics(seperated: boolean): void {
    Dependency.get(SurveyHttp)
      .downloadStatistics(this.survey.id, seperated)
      .subscribe((e: HttpResponse<Blob>) => {
        this.downLoadFile(e, "application/zip")
      });
  }

  getLastAnswers() {
    Dependency.get(AnswerHttp)
      .getAnswersBySurvey(this.search)
      .subscribe((answers: Answer[]) => {
        this.answers = this.answers.concat(answers);
        this.search.pagination.page++;
      });
  }

  /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);

    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }

  }
}

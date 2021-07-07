import { Component, Input, OnInit } from '@angular/core';
import AnswerBySurvey from 'src/app/@core/models/abswer-by-survey';
import Answer from 'src/app/@core/models/answer';
import File from 'src/app/@core/models/file';
import Pagination from 'src/app/@core/models/pagination';
import Survey from 'src/app/@core/models/survey';
import SurveySmallImage from 'src/app/@core/models/survey-small-image';
import AnswerHttp from '../../answer/answer-http';

@Component({
  selector: 'survey-activity',
  templateUrl: './survey-activity.component.html',
  styleUrls: ['./survey-activity.component.css']
})
export class SurveyActivityComponent implements OnInit {

  constructor(
    private answerHttpService: AnswerHttp
  ) { }

  page: number = 0;
  answers: Array<Answer> = [];

  @Input() survey!: Survey;

  ngOnInit(): void {
    this.getNextActivityPage();
    console.log(this.survey);
  }

  /**
   * Get next page of survey answer activity
   */
  getNextActivityPage(): void {
    const search: AnswerBySurvey = new AnswerBySurvey();
    search.pagination = new Pagination(++this.page, 5);
    search.surveyId = this.survey.id;

    this.answerHttpService
      .getAnswersBySurvey(search)
      .subscribe((answers: Answer[]) => {
        this.answers = this.answers.concat(answers);
        console.log(this.answers);
      });
  }

  getImage(id: number): SurveySmallImage {
    return this.survey.smallImages.filter(e => e.surveyImageId == id)[0];
  }

  getSize(id: number): number {
    return this.survey.images.filter(e => e.id == id)[0].size;
  }

  getAvatarClassByGender(gender: number) {
    return gender == 0 ? 'step-icon step-icon-dark' : gender == 1 ? 'step-icon step-icon-primary' : 'step-icon step-icon-danger';
  }
}

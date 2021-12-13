import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlSurveyAnswer } from 'src/app/@core/models/control-survey-answer';
import BaseHttp from 'src/app/base-http';

@Injectable({
  providedIn: 'root'
})
export class ControlSurveyAnswerHttpService extends BaseHttp<ControlSurveyAnswer> {

  constructor() {
    super('/api/ControlSurveyAnswers');
  }

  join(data: ControlSurveyAnswer): Observable<any> {
    const path: string = this.prefix + "/join";
    return this.http.post<any>(path, data);
  }
}

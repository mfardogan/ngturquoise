import { Observable } from "rxjs";
import AnswerBySurvey from "src/app/@core/models/abswer-by-survey";
import Answer from "src/app/@core/models/answer";
import BaseHttp from "src/app/base-http";

export default class AnswerHttp extends BaseHttp<Answer> {

    constructor() {
        super('/api/Answers');
    }

    /**
     * Get answers by survey
     * @param search 
     * @returns 
     */
    getAnswersBySurvey(search: AnswerBySurvey): Observable<Answer[]> {
        const path: string = this.prefix + '/searchbysurvey';
        return this.http.put<Answer[]>(path, search);
    }
}
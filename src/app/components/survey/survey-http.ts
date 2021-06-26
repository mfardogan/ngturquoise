import { Observable } from "rxjs/internal/Observable";
import SearchActivity from "src/app/@core/models/search-activity";
import SurveyActivity from "src/app/@core/models/surve-activity";
import Survey from "src/app/@core/models/survey";
import BaseHttp from "src/app/base-http";

export default class SurveyHttp extends BaseHttp<Survey> {

    constructor() {
        super('/api/Surveys');
    }

    getActivity(search: SearchActivity): Observable<SurveyActivity[]> {
        const path: string = this.prefix + '/activity';
        return this.http.put<SurveyActivity[]>(path, search);
    }
}
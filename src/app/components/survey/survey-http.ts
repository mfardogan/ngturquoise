import { Observable } from "rxjs/internal/Observable";
import SearchActivity from "src/app/@core/models/search-activity";
import SurveyActivity from "src/app/@core/models/surve-activity";
import Survey from "src/app/@core/models/survey";
import SurveyByCreator from "src/app/@core/models/survey-by-creator";
import SurveySummary from "src/app/@core/models/survey-summary";
import BaseHttp from "src/app/base-http";

export default class SurveyHttp extends BaseHttp<Survey> {

    constructor() {
        super('/api/Surveys');
    }

    createByForm(form: FormData): Observable<any> {
        const path: string = this.prefix;
        return this.http.post<any>(path, form);
    }

    getActivity(search: SearchActivity): Observable<SurveyActivity[]> {
        const path: string = this.prefix + '/activity';
        return this.http.put<SurveyActivity[]>(path, search);
    }

    byCreator(search: SurveyByCreator): Observable<Survey[]> {
        const path: string = this.prefix + '/bycreator';
        return this.http.put<Survey[]>(path, search);
    }

    getSummary(): Observable<SurveySummary> {
        const path: string = this.prefix + '/summary';
        return this.http.get<SurveySummary>(path);
    }
}
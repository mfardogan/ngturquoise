import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import ControlSurvey from "src/app/@core/models/control-survey";
import Search from "src/app/@core/models/search";
import BaseHttp from "src/app/base-http";

@Injectable()
export default class ControlSurveyHttp extends BaseHttp<ControlSurvey> {

    constructor() {
        super('/api/ControlSurveys');
    }

    searchSurveys(search: Search<ControlSurvey>): Observable<Array<ControlSurvey>> {
        return this.http.put<ControlSurvey[]>(this.prefix + '/search', search);
    }

    createByForm(form: FormData): Observable<any> {
        const path: string = this.prefix;
        return this.http.post<any>(path, form);
    }
}
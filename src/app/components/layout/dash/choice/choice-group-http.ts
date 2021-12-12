import { Observable } from "rxjs/internal/Observable";
import Choice from "src/app/@core/models/choice";
import ChoiceGroup from "src/app/@core/models/choice-group";
import BaseHttp from "src/app/base-http";

class ChoiceGroupHttp extends BaseHttp<ChoiceGroup>{
    constructor() {
        super("/api/ChoiceGroups");
    }

    markAsDefault(id: number): Observable<any> {
        const path: string = this.prefix + '/default/' + id;
        return this.http.put(path, null);
    }

    getAll(): Observable<Choice[]> {
        const path: string = this.prefix + '/getall';
        return this.http.get<Choice[]>(path);
    }
}

export default ChoiceGroupHttp;
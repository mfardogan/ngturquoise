import { Observable } from "rxjs/internal/Observable";
import DoctorGroup from "src/app/@core/models/doctor-group";
import BaseHttp from "src/app/base-http";

class DoctorGroupHttp extends BaseHttp<DoctorGroup>{
    constructor() {
        super("/api/DoctorGroups");
    }

    markAsDefault(id: number): Observable<any> {
        const path: string = this.prefix + '/default/' + id;
        return this.http.put(path, null);
    }
}

export default DoctorGroupHttp;
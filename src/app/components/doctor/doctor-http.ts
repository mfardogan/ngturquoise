import { Observable } from "rxjs";
import Doctor from "src/app/@core/models/doctor";
import BaseHttp from "src/app/base-http";

class DoctorHttp extends BaseHttp<Doctor>{
    constructor() {
        super("/api/Doctors");
    }

    confirm(id: number): Observable<any> {
        const path: string = this.prefix + '/confirm/' + id;
        return this.http.put(path, null);
    }

    changeType(id: number, type: number) {
        const path: string = this.prefix + '/settype/' + id + '/' + type;
        return this.http.put(path, null);
    }
}

export default DoctorHttp;
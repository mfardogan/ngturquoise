import { Observable } from "rxjs";
import ChangePassword from "src/app/@core/models/change-password";
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

    getmyinfo(): Observable<Doctor> {
        const path: string = this.prefix + '/getmyinfo';
        return this.http.get<Doctor>(path);
    }

    setBasicInfo(doctor: Doctor): Observable<any> {
        const path: string = this.prefix + '/modifybasicinfo';
        return this.http.put(path, doctor);
    }

    changePassword(password: ChangePassword): Observable<any> {
        const path: string = this.prefix + '/modifypassword';
        return this.http.put(path, password);
    }

    changeAvatar(form: FormData) {
        const path: string = this.prefix + '/modifyimage';
        return this.http.put(path, form);
    }

    removeMyAvatar(): Observable<any> {
        const path: string = this.prefix + '/removemyavatar';
        return this.http.delete(path);
    }
}

export default DoctorHttp;
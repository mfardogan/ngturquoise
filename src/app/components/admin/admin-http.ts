import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import Administrator from "src/app/@core/models/administrator";
import ChangePassword from "src/app/@core/models/change-password";
import BaseHttp from "src/app/base-http";

export default class AdminHttp extends BaseHttp<Administrator> {

    constructor() {
        super('/api/Administrators');
    }

    setBasicInfo(administrator: Administrator): Observable<any> {
        const path: string = this.prefix + '/modifybasicinfo';
        return this.http.put(path, administrator);
    }

    changePassword(password: ChangePassword): Observable<any> {
        const path: string = this.prefix + '/modifypassword';
        return this.http.put(path, password);
    }

    changeAvatar(form: FormData) {
        const path: string = this.prefix + '/modifyimage';
        return this.http.put(path, form);
    }

    getmyinfo(): Observable<Administrator> {
        const path: string = this.prefix + '/getmyinfo';
        return this.http.get<Administrator>(path);
    }

    clearAvatar(): Observable<any> {
        const path: string = this.prefix + '/clearavatar';
        return this.http.put(path, null);
    }
}
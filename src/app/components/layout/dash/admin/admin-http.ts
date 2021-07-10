import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Administrator from "src/app/@core/models/administrator";
import ChangePassword from "src/app/@core/models/change-password";
import ModifyAdminPassword from "src/app/@core/models/modify-admin-pass";
import Search from "src/app/@core/models/search";
import SearchAdmin from "src/app/@core/models/search-admin";
import BaseHttp from "src/app/base-http";

@Injectable()
export default class AdminHttp extends BaseHttp<Administrator> {

    constructor() {
        super('/api/Administrators');
    }

    searchAdministrators(search: Search<SearchAdmin>): Observable<Array<Administrator>> {
        return this.http.put<Administrator[]>(this.prefix + '/search', search);
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

    clearAvatarById(id: number) {
        const path: string = this.prefix + '/clearavatarbyid/' + id;
        return this.http.put(path, null);
    }

    modifyadminPassword(password: ModifyAdminPassword) {
        const path: string = this.prefix + '/modifyadminpassword';
        return this.http.put(path, password);
    }
}
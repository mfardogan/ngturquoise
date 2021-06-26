import { Observable } from "rxjs";
import { Dependency } from "./app.module";
import Search from "./@core/models/search";
import { HttpClient } from "@angular/common/http";
import { BackendConfigService } from "./@core/services/backend-config.service";

class BaseHttp<T> {

    constructor(prefix: string) {
        const config = Dependency.get(BackendConfigService);
        this.prefix = config.getUrl() + prefix;
    }

    protected prefix: string = '';
    protected http: HttpClient = Dependency.get(HttpClient);

    get(id: number): Observable<T> {
        return this.http.get<T>(this.prefix + '/' + id);
    }

    search(search: Search<T>): Observable<Array<T>> {
        return this.http.put<T[]>(this.prefix + '/search', search);
    }

    add(item: T): Observable<any> {
        return this.http.post(this.prefix, item);
    }

    update(item: T): Observable<any> {
        return this.http.put(this.prefix, item);
    }

    remove(id: number): Observable<any> {
        return this.http.delete(this.prefix + '/' + id);
    }
}

export default BaseHttp;
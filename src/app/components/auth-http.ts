import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import LoginViewModel from "../@core/models/login-view-model";
import Token from "../@core/models/token";
import { BackendConfigService } from "../@core/services/backend-config.service";
import { Dependency } from "../app.module";

export default class AuthHttp {
    constructor() {
        const config = Dependency.get(BackendConfigService);
        this.prefix = config.getUrl();
    }

    protected prefix: string = '';
    protected http: HttpClient = Dependency.get(HttpClient);

    doctor(viewModel: LoginViewModel): Observable<Token> {
        return this.http.put<Token>(this.prefix + '/token/doctor', viewModel);
    }

    admin(viewModel: LoginViewModel): Observable<Token> {
        return this.http.put<Token>(this.prefix + '/token/admin', viewModel);
    }
}
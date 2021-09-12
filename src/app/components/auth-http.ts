import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import LoginViewModel from "../@core/models/login-view-model";
import Token from "../@core/models/token";
import { BackendConfigService } from "../@core/services/backend-config.service";
import { Dependency } from "../app.module";

@Injectable()
export default class AuthHttp {
    constructor(private configuration: BackendConfigService) {
        this.prefix = configuration.getUrl();
        console.log(this.prefix);
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
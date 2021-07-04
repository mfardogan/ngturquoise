import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { TokenServiceService } from "../@core/services/token-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenServiceService
    ) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'bearer ' + this.tokenService.getToken())
            });

            return next.handle(cloned);
        } else {

            return next.handle(req);
        }
    }
}
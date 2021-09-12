

import { Injectable } from "@angular/core";
import { TokenServiceService } from "../@core/services/token-service.service";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private tokenService: TokenServiceService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'bearer ' + this.tokenService.getToken())
            });

            return next.handle(cloned).pipe(
                catchError((error: HttpErrorResponse) => {
                    var err: string = '';
                    if (error.error instanceof ErrorEvent) {
                        err = error.error.message;
                        this.toastr.error(err, "Hata!");
                    }
                    else {
                        err = error.message;
                        this.toastr.error(error.message, "Hata!");
                    }
                    return throwError(err);
                })
            );
        } else {

            return next.handle(req);
        }
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardDoctorService implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenServiceService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.isValidForDoctor()) {
      return true;
    } else {
      this.router.navigate(['/signin'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }

  isValidForDoctor(): boolean {
    return this.tokenService.isDoctor() && this.tokenService.getDoctorId() > 0;
  }
}

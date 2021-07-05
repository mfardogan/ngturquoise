import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenServiceService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.isValidForAdministrator()) {
      return true;
    } else {
      this.router.navigate(['/signin/admin'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }

  isValidForAdministrator(): boolean {
    return this.tokenService.isAdmin() && this.tokenService.getAdminId() > 0;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LoginViewModel from 'src/app/@core/models/login-view-model';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import { Dependency } from 'src/app/app.module';
import AuthHttp from 'src/app/components/auth-http';

@Component({
  selector: 'sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.css']
})
export class SignInAdminComponent implements OnInit {

  loginViewModel: LoginViewModel = new LoginViewModel();

  constructor(
    private router: Router,
    private authHttp: AuthHttp,
    private tokenService: TokenServiceService
  ) { }

  ngOnInit(): void {
  }

  login() {


    this.authHttp.admin(this.loginViewModel)
      .subscribe((e) => {
        this.tokenService.saveOnLocalStorage(e);
        this.router.navigate(['/dashboard']);
      });
  }
}

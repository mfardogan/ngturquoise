import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private router: Router,
    private authHttp: AuthHttp,
    private tokenService: TokenServiceService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginViewModel.password == '' || this.loginViewModel.email == '') {
      this.toastr.warning("E-posta ve şifrenizi giriniz!", "Dikkat!");
      return;
    }

    this.authHttp.admin(this.loginViewModel)
      .subscribe((e) => {
        this.tokenService.saveOnLocalStorage(e);
        this.router.navigate(['/dash']);
      }, (err: HttpErrorResponse) => {
        this.toastr.error("Kullanıcı girişi başarısız! \n" + err.message, "Dikkat!");
      });
  }
}

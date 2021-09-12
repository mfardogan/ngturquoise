import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import LoginViewModel from 'src/app/@core/models/login-view-model';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import { Dependency } from 'src/app/app.module';
import AuthHttp from 'src/app/components/auth-http';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginViewModel: LoginViewModel = new LoginViewModel();

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  login() {

    if (this.loginViewModel.password == '' || this.loginViewModel.email == '') {
      this.toastr.warning("E-posta ve şifrenizi giriniz!", "Dikkat!");
      return;
    }

    const api = Dependency.get(AuthHttp);
    const token = Dependency.get(TokenServiceService);

    api.doctor(this.loginViewModel)
      .subscribe((e) => {
        token.saveOnLocalStorage(e);
        this.router.navigate(['/user']);
      }, (error: HttpErrorResponse) => {
        this.toastr.error("Kullanıcı girişi başarısız! \n" + error.message, "Dikkat!");
      });
  }
}

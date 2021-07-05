import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Administrator from 'src/app/@core/models/administrator';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import { Dependency } from 'src/app/app.module';
import AdminHttp from '../admin/admin-http';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private httpService: AdminHttp,
    private tokenService: TokenServiceService
  ) { }

  administrator: Administrator = new Administrator();

  ngOnInit(): void {
    const admin = this.tokenService.getAdminId();
    this.httpService.get(admin)
      .subscribe((administrator: Administrator) => {
        this.administrator = administrator;
      })
  }

  signout() {
    this.tokenService.clearToken();
    this.router.navigate(['signin/admin']);
  }
}

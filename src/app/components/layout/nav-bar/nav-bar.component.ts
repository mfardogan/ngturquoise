import { Component, OnInit } from '@angular/core';
import Administrator from 'src/app/@core/models/administrator';
import { TokenServiceService } from 'src/app/@core/services/token-service.service';
import { Dependency } from 'src/app/app.module';
import AdminHttp from '../../admin/admin-http';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  administrator: Administrator = new Administrator();

  ngOnInit(): void {
    const admin = Dependency.get(TokenServiceService).getAdminId();
    const httpService = Dependency.get(AdminHttp);

    httpService.get(admin).subscribe((administrator: Administrator) => {
      this.administrator = administrator;
    })
  }
}

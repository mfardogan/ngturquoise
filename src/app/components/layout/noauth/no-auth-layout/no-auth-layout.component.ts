import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/@core/services/auth-guard.service';

@Component({
  selector: 'app-no-auth-layout',
  templateUrl: './no-auth-layout.component.html',
  styleUrls: ['./no-auth-layout.component.css']
})
export class NoAuthLayoutComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('navbar-vertical-aside-show-xl');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('navbar-vertical-aside-show-xl');
  }
}

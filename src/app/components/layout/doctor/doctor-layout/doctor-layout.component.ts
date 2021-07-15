import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-layout',
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.css']
})
export class DoctorLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadExternalScript('../../../../../assets/js/layout.js');
  }

  public loadExternalScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}

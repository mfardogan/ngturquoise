import { Location } from '@angular/common';
import { Dependency } from 'src/app/app.module';
import { Component, OnInit } from '@angular/core';
import DoctorGroupHttp from '../doctor-group-http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import DoctorGroup from 'src/app/@core/models/doctor-group';

@Component({
  selector: 'doctor-group-item',
  templateUrl: './doctor-group-item.component.html',
  styleUrls: ['./doctor-group-item.component.css']
})
export class DoctorGroupItemComponent implements OnInit {

  private id!: number;
  data: DoctorGroup = new DoctorGroup();

  constructor(
    private route: Router,
    private history: Location,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);

      Dependency.get(DoctorGroupHttp).get(this.id)
        .subscribe((data: DoctorGroup) => {
          this.data = data;
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.route.navigate(['/404'], { skipLocationChange: true });
          }
        }); //HttpInterceptor
    }
  }

  save(): void {
    const http: DoctorGroupHttp =
      Dependency.get(DoctorGroupHttp);

    if (this.id != null || this.id != undefined) {
      http.update(this.data).subscribe((x: any) => {
        this.route.navigate(['/groups'], { skipLocationChange: true });
      });
    } else {
      http.add(this.data).subscribe((x: any) => {
        this.route.navigate(['/groups'], { skipLocationChange: true });
      });
    }
  }

  cancel(): void {
    this.history.back();
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Choice from 'src/app/@core/models/choice';
import ChoiceGroup from 'src/app/@core/models/choice-group';
import { Dependency } from 'src/app/app.module';
import ChoiceGroupHttp from '../choice-group-http';

@Component({
  selector: 'app-choice-group-item',
  templateUrl: './choice-group-item.component.html',
  styleUrls: ['./choice-group-item.component.css']
})
export class ChoiceGroupItemComponent implements OnInit {

  constructor
    (
      private toastr: ToastrService,
      private route: Router,
      private history: Location,
      private router: ActivatedRoute
    ) { }

  private id!: number;
  private counter: number = 0;
  data: ChoiceGroup = new ChoiceGroup();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);
      Dependency.get(ChoiceGroupHttp)
        .get(this.id)
        .subscribe(
          (data: ChoiceGroup) => {
            this.data = data;
          });
    }
  }

  //save changes
  save(): void {

    if (this.data.name == '') {
      this.toastr.warning("Seçenek grubu adı boş olamaz!", "Dikkat!");
      return;
    }

    if (this.data.choices.length == 0) {
      this.toastr.warning("Renk sınıflarını giriniz!", "Dikkat!");
      return;
    }
    if (this.data.choices.filter(e => e.name == '').length > 0) {
      this.toastr.warning("Renk sınıfları bir isme sahip olmalıdır!", "Dikkat!");
      return;
    }

    const http: ChoiceGroupHttp = Dependency.get(ChoiceGroupHttp);
    if (this.id != null || this.id != undefined) {
      http.update(this.data).subscribe((x: any) => {
        this.toastr.success("Güncelleme işlemi yapıldı!", "Dikkat!");
        this.route.navigate(['/dash/choices'], { skipLocationChange: true });
      });

    } else {
      http.add(this.data).subscribe((x: any) => {
        this.toastr.success("Ekleme işlemi yapıldı!", "Dikkat!");
        this.route.navigate(['/dash/choices'], { skipLocationChange: true });
      });
    }
  }

  cancel(): void {
    this.history.back();
  }

  //remove choice from the choice list
  killChoice(sequence: number): void {
    this.data.choices.splice(sequence, 1);
  }

  //add a choice into the choice list
  addChoice(): void {
    const sequence = ++this.counter;
    const choice: Choice = new Choice();
    choice.number = sequence;
    choice.code = 'Cl' + sequence;
    choice.color = '#363636';
    this.data.choices.push(choice);
  }
}

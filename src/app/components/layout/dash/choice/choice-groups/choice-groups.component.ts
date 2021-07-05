import { Component, OnInit } from '@angular/core';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import ChoiceGroupHttp from '../choice-group-http';
import ChoiceGroup from 'src/app/@core/models/choice-group';

@Component({
  selector: 'choice-groups',
  templateUrl: './choice-groups.component.html',
  styleUrls: ['./choice-groups.component.css', '../../../../../../assets/vendor/select2/dist/css/select2.min.css']
})
export class ChoiceGroupsComponent implements OnInit {

  constructor() { }

  data: Array<ChoiceGroup> = [];
  search: Search<ChoiceGroup> = new Search<ChoiceGroup>();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    Dependency.get(ChoiceGroupHttp).search(this.search)
      .subscribe((data: Array<ChoiceGroup>) => {
        this.data = data;
      });
  }

  remove(id: number): void {
    Dependency.get(ChoiceGroupHttp).remove(id).subscribe(x => {
      const sequence: number = this.data.findIndex(e => e.id == id);
      this.data.splice(sequence, 1);
    });
  }

  markAsDefault(id: number): void {
    Dependency.get(ChoiceGroupHttp).markAsDefault(id).subscribe((e: any) => {
      this.data.forEach(element => {
        element.default = element.id == id;
      });
    });
  }
}

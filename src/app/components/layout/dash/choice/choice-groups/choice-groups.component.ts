import { Component, OnInit } from '@angular/core';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import ChoiceGroupHttp from '../choice-group-http';
import ChoiceGroup from 'src/app/@core/models/choice-group';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'choice-groups',
  templateUrl: './choice-groups.component.html',
  styleUrls: [
    './choice-groups.component.css',
    '../../../../../../assets/vendor/select2/dist/css/select2.min.css'
  ]
})
export class ChoiceGroupsComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private choiceGroupHttp: ChoiceGroupHttp
  ) { }

  data: Array<ChoiceGroup> = [];
  filterClauses: ChoiceGroup = new ChoiceGroup();
  search: Search<ChoiceGroup> = new Search<ChoiceGroup>();

  /**
   * Prepare
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNextPageOfChoiceGroups();
  }

  /**
   * Get from server
   */
  getNextPageOfChoiceGroups() {
    this.choiceGroupHttp.search(this.search)
      .subscribe((data: Array<ChoiceGroup>) => {
        this.data = data;
      });
  }

  /**
   * Remove choice group
   * @param id Choice group id
   */
  remove(id: number): void {
    this.choiceGroupHttp.remove(id)
      .subscribe(x => {
        const sequence: number = this.data.findIndex(e => e.id == id);
        this.data.splice(sequence, 1);
        this.toastr.success("Silme işlemi başarıyla yapıldı!", "Dikkat!");
      });
  }

  /**
   * Set as default
   * @param id Choice group id
   */
  markAsDefault(id: number): void {
    this.choiceGroupHttp.markAsDefault(id)
      .subscribe((e: any) => {
        this.data.forEach(element => {
          element.default = element.id == id;
          this.toastr.success("İşlem başarıyla yapıldı!", "Dikkat!");
        });
      });
  }

  /**
   * Apply filters
   */
  applyFilters() {
    this.search.filter = this.filterClauses;
    this.getNextPageOfChoiceGroups();
  }

  /**
   * Clear filters
   */
  clearFilters() {
    this.filterClauses = new ChoiceGroup();
    this.search = new Search();
    this.getNextPageOfChoiceGroups();
  }
}

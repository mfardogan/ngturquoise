import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ChoiceGroup from 'src/app/@core/models/choice-group';
import Pagination from 'src/app/@core/models/pagination';
import Search from 'src/app/@core/models/search';
import Survey from 'src/app/@core/models/survey';
import { Dependency } from 'src/app/app.module';
import ChoiceGroupHttp from '../../choice/choice-group-http';
import SurveyHttp from '../survey-http';

@Component({
  selector: 'survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  confirmToDelete: boolean = false;
  surveyStatus: number = 0;
  choices: Array<ChoiceGroup> = [];
  @Input() survey!: Survey;

  getChoiceGroups() {

    const searchChoices = new Search<ChoiceGroup>();
    searchChoices.pagination = Pagination.max();

    Dependency.get(ChoiceGroupHttp)
      .search(searchChoices)
      .subscribe((choices: ChoiceGroup[]) => {
        this.choices = choices;
      });
  }

  save() {
    Dependency.get(SurveyHttp)
      .modifyByForm(this.createForm())
      .subscribe((e: any) => {
        this.router.navigate(['/dashboard/surveys']);
      });
  }


  createForm(): FormData {
    const form: FormData = new FormData();
    form.append('id', this.survey.id.toString());
    form.append('title', this.survey.title);
    form.append('body', this.survey.body);
    form.append('choiceGroupId', this.survey.choiceGroupId.toString());
    form.append('manuelFinish', String(this.survey.automaticFinish));
    form.append('startNow', String(this.survey.startNow));

    if (this.survey.startNow) {
      form.append('startAt', String(this.survey.startAt));
    }
    if (this.survey.automaticFinish) {
      form.append('finishAt', String(this.survey.finishAt));
    }

    return form;
  }

  ngOnInit(): void {
    this.getChoiceGroups();
  }

  setStatus(status: number, event: any) {
    if (event.target.value) {
      this.survey.status = status;
    }
  }

  changeStatus() {
    const id = this.survey.id;
    const status = this.survey.status;

    Dependency.get(SurveyHttp)
      .setSurveyStatus(id, status)
      .subscribe(() => { });
  }

  remove() {
    if (!this.confirmToDelete) {
      return;
    }

    const id = this.survey.id;
    Dependency.get(SurveyHttp)
      .remove(id).subscribe(() => {
        this.router.navigate(['/dashboard/surveys']);
      });
  }
}

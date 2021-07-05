declare var $: any;
import SurveyHttp from '../survey-http';
import { Dependency } from 'src/app/app.module';
import Survey from 'src/app/@core/models/survey';
import { Component, OnInit } from '@angular/core';
import Search from 'src/app/@core/models/search';
import Pagination from 'src/app/@core/models/pagination';
import ChoiceGroup from 'src/app/@core/models/choice-group';
import ChoiceGroupHttp from '../../choice/choice-group-http';
import DoctorGroup from 'src/app/@core/models/doctor-group';

@Component({
  selector: 'create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: [
    './create-survey.component.css',
    '../../../../../../assets/vendor/select2/dist/css/select2.min.css',
    '../../../../../../assets/vendor/@yaireo/tagify/dist/tagify.css'
  ]
})
export class CreateSurveyComponent implements OnInit {

  constructor() { }

  files: any[] = [];
  uploading: string[] = [];
  choices: ChoiceGroup[] = [];
  data: Survey = new Survey();

  ngOnInit(): void {

    const search = new Search<ChoiceGroup>();
    search.pagination = new Pagination(1, 999);

    Dependency.get(ChoiceGroupHttp)
      .search(search)
      .subscribe((choices: ChoiceGroup[]) => {
        this.choices = choices;
        const defaultChoiceGroup = this.choices.filter(e => e.default)[0];
        if (defaultChoiceGroup != null) {
          this.data.choiceGroupId = defaultChoiceGroup.id;
        }
      });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const name = e.target?.result?.toString();
          this.uploading.push(name!);
        };

        const next = files[i];
        reader.readAsDataURL(next);
        this.files.push(next);
      }
    }
  }

  removeFile(sequence: number) {
    this.uploading.splice(sequence, 1);
    this.files.splice(sequence, 1);
  }

  discard() {
    this.data = new Survey();
    this.uploading = [];
    this.files = [];
  }

  createForm(): FormData {
    const form: FormData = new FormData();
    form.append('title', this.data.title);
    form.append('body', this.data.body);
    form.append('choiceGroupId', this.data.choiceGroupId.toString());
    form.append('manuelFinish', String(this.data.automaticFinish));
    form.append('startNow', String(this.data.startNow));

    if (this.data.startNow) {
      form.append('startAt', String(this.data.startAt));
    }
    if (this.data.automaticFinish) {
      form.append('finishAt', String(this.data.finishAt));
    }

    for (var i = 0; i < this.files.length; i++) {
      const next = this.files[i];
      form.append('files', next);
    }
    return form;
  }

  save() {
    Dependency.get(SurveyHttp)
      .createByForm(this.createForm())
      .subscribe((e: any) => {
        this.discard();
        this.showSuccessDialog();
      });
  }

  showSuccessDialog() {
    $("#exampleModal").modal("show");
  }

  closeSuccessDialog() {
    $("#exampleModal").modal("hide");
    this.discard();
  }
}

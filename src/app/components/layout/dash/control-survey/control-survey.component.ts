declare var $: any;

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import ControlSurvey from 'src/app/@core/models/control-survey';
import Search from 'src/app/@core/models/search';
import { Dependency } from 'src/app/app.module';
import ControlSurveyHttp from './control-survey-http';

@Component({
  selector: 'control-survey',
  templateUrl: './control-survey.component.html',
  styleUrls: ['./control-survey.component.css']
})
export class ControlSurveyComponent implements OnInit {

  constructor(
    private toastr: ToastrService
  ) { }

  totalPages: number = 0;
  paginations: Array<number> = [];
  datas: Array<ControlSurvey> = [];
  search: Search<ControlSurvey> = new Search<ControlSurvey>();

  data: ControlSurvey = new ControlSurvey();
  uploading: string[] = [];
  files: any[] = [];

  textFileName: string = '';
  uploadingText: string[] = [];
  filesText: any[] = [];

  more() {
    this.search.pagination.page = this.search.pagination.page + 1;
    Dependency.get(ControlSurveyHttp).search(this.search)
      .subscribe((data: Array<ControlSurvey>) => {
        this.datas.concat(data);
      })
  }

  ngOnInit(): void {
    this.getNextPageOfControlSurveys();
  }

  /**
  * Get next page
  */
  getNextPageOfControlSurveys(): void {
    Dependency.get(ControlSurveyHttp).search(this.search)
      .subscribe((data: Array<ControlSurvey>) => {
        this.datas = data;
      })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.uploading = [];
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

  onFileChangeText(event: any) {
    if (event.target.files.length > 0) {
      this.uploadingText = [];
      const files = event.target.files;
      this.textFileName = files[0].name;

      for (var i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const name = e.target?.result?.toString();
          this.uploadingText.push(name!);
        };

        const next = files[i];
        reader.readAsDataURL(next);
        this.filesText.push(next);
      }
    }
  }

  removeFileText(sequence: number) {
    this.uploadingText.splice(sequence, 1);
    this.filesText.splice(sequence, 1);
  }


  discard() {
    this.textFileName = '';
    this.filesText = [];
    this.uploadingText = [];
    this.uploading = [];
    this.files = [];
    this.data = new ControlSurvey();
  }

  createForm(): FormData {

    const form: FormData = new FormData();
    form.append('title', this.data.title);

    const image = this.files[0];
    form.append("image", image);

    const text = this.filesText[0];
    form.append("text", text);

    console.log(form);
    return form;
  }



  save() {
    if (this.data.title == '') {
      this.toastr.warning("Anket başlığını giriniz...", "Dikkat!");
      return;
    }

    if (this.files.length == 0) {
      this.toastr.warning("Anket resmini seçiniz...", "Dikkat!");
      return;
    }

    if (this.filesText.length == 0) {
      this.toastr.warning("Anket text dosyasını seçiniz...", "Dikkat!");
      return;
    }

    Dependency.get(ControlSurveyHttp)
      .createByForm(this.createForm())
      .subscribe((e: any) => {
        this.discard();
        this.hideModal();
        this.toastr.success("Kayıt başarıyla yapıldı!", "Dikkat!");
        this.getNextPageOfControlSurveys();
      });
  }

  hideModal() {
    $("#staticBackdrop").modal("hide");
  }

  remove(id: number) {
    Dependency.get(ControlSurveyHttp).remove(id).subscribe(e => {
      const target = this.datas.filter(e => e.id === id)[0];
      const index = this.datas.indexOf(target);
      if (index !== -1) {
        this.datas.splice(index, 1);
      }
    });
  }
}

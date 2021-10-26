declare var $: any;
import SurveyHttp from '../survey-http';
import { Dependency } from 'src/app/app.module';
import Survey from 'src/app/@core/models/survey';
import { Component, OnInit, ViewChild } from '@angular/core';
import Search from 'src/app/@core/models/search';
import Pagination from 'src/app/@core/models/pagination';
import ChoiceGroup from 'src/app/@core/models/choice-group';
import ChoiceGroupHttp from '../../choice/choice-group-http';
import { WebcamImage } from 'ngx-webcam';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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

  @ViewChild('cam') camera: any;
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  files: any[] = [];
  uploadingCameraFiles: string[] = [];
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
    this.uploadingCameraFiles = [];
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
    if (this.data.title == '') {
      this.toastr.warning("Anket başlığını giriniz!", "Dikkat!");
      return;
    }

    if (this.data.choiceGroupId == 0) {
      this.toastr.warning("Anket seçenek grubunu seçiniz!", "Dikkat!");
      return;
    }

    if (this.files.length == 0) {
      this.toastr.warning("Anket resimlerini seçiniz!", "Dikkat!");
      return;
    }

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

  handleImage(image: WebcamImage) {
    const data: string = image.imageAsDataUrl;
    this.uploadingCameraFiles.push(data);
  }

  takePhoto() {
    this.camera.triggerSnapshot();
  }

  showCamera() {
    this.camera.open();
    $("#staticBackdrop").modal("show");
  }

  removeCameraFile(sequence: number) {
    this.uploadingCameraFiles.splice(sequence, 1);
  }

  moveToFiles() {
    this.uploadingCameraFiles.forEach(element => {
      this.uploading.push(element);
      const name: string = Math.random().toString(36).substring(7);
      const binary: File = this.dataURItoBlob(element, name + ".jpg");
      this.files.push(binary);
    });

    this.uploadingCameraFiles = [];
    $("#staticBackdrop").modal("hide");
    this.camera.close();

  }

  dataURItoBlob(dataURI: any, fileName: string): File {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new File([ia], fileName, { type: mimeString });
  }

  cancelCamera() {
    this.uploadingCameraFiles = [];
    this.camera.close();
  }

  gotoSurveys() {
    $("#exampleModal").modal("hide");
    this.router.navigate(['/dash/surveys']);
  }
}

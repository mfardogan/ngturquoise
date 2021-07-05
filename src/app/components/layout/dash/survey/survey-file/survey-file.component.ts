
declare var $: any;
import { Component, Input, OnInit } from '@angular/core';
import Survey from 'src/app/@core/models/survey';

@Component({
  selector: 'survey-file',
  templateUrl: './survey-file.component.html',
  styleUrls: ['./survey-file.component.css']
})
export class SurveyFileComponent implements OnInit {

  constructor() { }

  lastFileView: string = '';
  @Input() survey!: Survey;

  ngOnInit(): void {
  }

  showBigImage(sequence: number) {
    this.lastFileView = this.survey.images[sequence].fileName;
    this.showModal();
  }

  showModal() {
    $(".bd-example-modal-lg").modal("show");
  }

  addFile() {
    $("#uploadFilesModal").modal("show");
  }
}

import { Component, Input, OnInit } from '@angular/core';
import Survey from 'src/app/@core/models/survey';

@Component({
  selector: 'survey-file',
  templateUrl: './survey-file.component.html',
  styleUrls: ['./survey-file.component.css']
})
export class SurveyFileComponent implements OnInit {

  constructor() { }

  @Input() survey!: Survey;

  ngOnInit(): void {
  }
}

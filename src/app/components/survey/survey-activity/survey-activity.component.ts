import { Component, Input, OnInit } from '@angular/core';
import Survey from 'src/app/@core/models/survey';

@Component({
  selector: 'survey-activity',
  templateUrl: './survey-activity.component.html',
  styleUrls: ['./survey-activity.component.css']
})
export class SurveyActivityComponent implements OnInit {

  constructor() { }

  @Input() survey!: Survey;

  ngOnInit(): void {
  }

}

import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Survey from 'src/app/@core/models/survey';
import { Dependency } from 'src/app/app.module';
import SurveyHttp from '../survey-http';

@Component({
  selector: 'survey-general',
  templateUrl: './survey-general.component.html',
  styleUrls: ['./survey-general.component.css']
})
export class SurveyGeneralComponent implements OnInit {

  constructor(
  ) { }

  @Input() survey!: Survey

  ngOnInit(): void {
  }

  downloadStatistics(): void {
    Dependency.get(SurveyHttp)
      .downloadStatistics(this.survey.id)
      .subscribe((e: HttpResponse<Blob>) => {
        this.downLoadFile(e, "application/zip")
      });
  }

  /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);

    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }

  }
}

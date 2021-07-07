import { Component, OnInit } from '@angular/core';
import ChoiceGroup from 'src/app/@core/models/choice-group';
import Pagination from 'src/app/@core/models/pagination';
import Search from 'src/app/@core/models/search';
import Survey from 'src/app/@core/models/survey';
import SurveySummary from 'src/app/@core/models/survey-summary';
import ChoiceGroupHttp from '../../choice/choice-group-http';
import SurveyHttp from '../survey-http';

@Component({
  selector: 'surveys',
  templateUrl: './surveys.component.html',
  styleUrls: [
    './surveys.component.css',
    '../../../../../../assets/vendor/select2/dist/css/select2.min.css'
  ]
})
export class SurveysComponent implements OnInit {

  constructor(
    private surveyHttp: SurveyHttp,
    private choiceGroupsHttp: ChoiceGroupHttp
  ) { }

  data: Array<Survey> = []
  choiceGroups: Array<ChoiceGroup> = []

  filterClauses: Survey = new Survey()
  search: Search<Survey> = new Search<Survey>()
  summary: SurveySummary = new SurveySummary()

  ngOnInit(): void {
    this.search.pagination.rows = 10
    this.getSurveysBySearch()

    const getSurveySummary = () => {
      this.surveyHttp.getSummary()
        .subscribe((summary: SurveySummary) => {
          this.summary = summary
        })
    }

    const getChoiceGroups = () => {
      const search = new Search<ChoiceGroup>()
      search.pagination = Pagination.max()
      this.choiceGroupsHttp.search(search)
        .subscribe((choiceGroups: Array<ChoiceGroup>) => {
          this.choiceGroups = choiceGroups
        })
    }

    getChoiceGroups();
    getSurveySummary();
  }


  /**
   * Get surveys by search
   */
  getSurveysBySearch(): void {
    this.surveyHttp.search(this.search)
      .subscribe((data: Survey[]) => {
        this.data = data
      })
  }

  /**
   * Get nexy page of surveys
   */
  nextPage(): void {
    this.search.pagination.page++
    this.getSurveysBySearch()
  }

  /**
   * Get previous page of surveys
   * @returns void
   */
  previousPage(): void {
    const current = this.search.pagination.page;
    if (current == 1) { return }

    this.search.pagination.page--
    this.getSurveysBySearch()
  }

  /**
   * Apply filters
   */
  applyFilters(): void {
    this.search.pagination.page = 1
    this.search.filter = this.filterClauses
    this.getSurveysBySearch()
  }

  /**
   * Clear filters
   */
  clearFilters(): void {
    this.search = new Search<Survey>()
    this.filterClauses = new Survey()
    this.getSurveysBySearch()
  }
}

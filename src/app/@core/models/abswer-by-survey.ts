import Pagination from "./pagination";

export default class AnswerBySurvey {
    surveyId: number = 0;
    pagination: Pagination = new Pagination(1, 10);
}
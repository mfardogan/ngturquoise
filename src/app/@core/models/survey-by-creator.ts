import Pagination from "./pagination";
import ViewModel from "./view-model";

export default class SurveyByCreator extends ViewModel {
    administratorId: number = 0;
    pagination: Pagination = new Pagination(1, 10);
}
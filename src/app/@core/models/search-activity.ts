import Pagination from "./pagination";
import ViewModel from "./view-model";

export default class SearchActivity extends ViewModel {
    creator: number = 0;
    pagination: Pagination = new Pagination(1, 10);
}
import Pagination from "./pagination";

class Search<T>{
    filter!: T;
    pagination: Pagination = new Pagination();
}

export default Search;
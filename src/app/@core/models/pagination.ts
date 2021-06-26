class Pagination {
    page: number = 1;
    rows: number = 20;


    constructor(page?: number, rows?: number) {
        this.page = page ?? 1;
        this.rows = rows ?? 20;
    }
}

export default Pagination;
class Pagination {
    page: number = 1;
    rows: number = 20;


    constructor(page?: number, rows?: number) {
        this.page = page ?? 1;
        this.rows = rows ?? 20;
    }


    /**
     * Get page for getting all rows
     * @returns Pagination
     */
    static max(): Pagination {
        const pagination = new Pagination();
        pagination.page = 1;
        pagination.rows = 9999;
        return pagination;
    }
}

export default Pagination;
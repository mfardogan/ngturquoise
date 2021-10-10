import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  private delta: number = 2;

  getPages(currentPageNum: number, totalPageCount: number): Array<number> {
    const pages = new Array<number>();
    for (let i = 0; i < totalPageCount; i++) {
      const pageNum = i + 1;
      if (i === 0 || i === totalPageCount - 1) {

        pages.push(pageNum);
      } else {
        const left = currentPageNum - this.delta - 1;
        const right = currentPageNum + this.delta + 1;
        if (i > left - 2 && i < right) {
          if (left === pageNum || right === pageNum) {
            //add left & right ellipsis.
            pages.push(-1);
          } else {
            //add in-between page numbers.
            pages.push(pageNum);
          }
        }
      }
    }
    return pages;
  }
}

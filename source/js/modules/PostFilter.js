export class PostFilter{
    constructor() {
        this.pageIndex,
        this.sortBy,
        this.tags,
        this.year,
        this.month,
        this.totalPages,
        this.updateFilter();
    }
    updateFilter(pageIndex = 1, totalPages = 0, sortBy = "new", tags = [""], year = 0, month = 0){
        this.pageIndex = pageIndex;
        this.sortBy = sortBy;
        this.tags = tags;
        this.year = year;
        this.month = month;
        this.totalPages = totalPages;
    }
}
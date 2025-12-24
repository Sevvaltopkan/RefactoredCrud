export class CategoryResponseModel {
    id: number;
    categoryName: string;
    description: string;

    constructor(id: number, categoryName: string, description: string) {
        this.id = id;
        this.categoryName = categoryName;
        this.description = description;
    }
}


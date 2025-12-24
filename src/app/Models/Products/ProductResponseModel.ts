export class ProductResponseModel {
    id: number;
    productName: string;
    unitPrice: number;
    categoryId: number | null;
    categoryName: string;

    constructor(id: number, productName: string, unitPrice: number, categoryId: number | null, categoryName: string) {
        this.id = id;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}

import { BaseProductViewModel } from "./BaseProductViewModel";

export class CreateProductRequestModel extends BaseProductViewModel {
    constructor(productName: string, unitPrice: number, categoryId: number | null) {
        super(productName, unitPrice, categoryId);
    }
}

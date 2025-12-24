import { FormGroup } from "@angular/forms";
import { CreateProductRequestModel } from "../../Models/Products/CreateProductRequestModel";
import { baseProductForm, BaseProductForm } from "./BaseProductFormFactory";

export type CreateProductForm = FormGroup<ReturnType<typeof baseProductForm>>;

export function createProductForm(): CreateProductForm {
    return new FormGroup(baseProductForm());
}

export function toCreateProductRequest(form: CreateProductForm): CreateProductRequestModel {
    const categoryIdValue = form.controls.categoryId.value;
    
    return {
        productName: form.controls.name.value,
        unitPrice: Number(form.controls.unitPrice.value),
        categoryId: categoryIdValue !== null ? Number(categoryIdValue) : null,
    };
}

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UpdateProductRequestModel } from "../../Models/Products/UpdateProductRequestModel";
import { baseProductForm, BaseProductForm } from "./BaseProductFormFactory";

export type UpdateProductForm = FormGroup<{
    id: FormControl<number>;
    name: FormControl<string>;
    unitPrice: FormControl<number>;
    categoryId: FormControl<number | null>;
}>;

export function updateProductForm() {
    const base = baseProductForm();

    base.name.addValidators([Validators.maxLength(50)]);
    base.name.updateValueAndValidity({ emitEvent: false });

    return new FormGroup({
        id: new FormControl(0, {
            validators: [Validators.required, Validators.min(1)],
            nonNullable: true
        }),
        ...base,
    });
}

export function toUpdateProductRequest(form: UpdateProductForm): UpdateProductRequestModel {
    return {
        id: form.controls.id.value,
        productName: form.controls.name.value,
        unitPrice: form.controls.unitPrice.value,
        categoryId: form.controls.categoryId.value,
    };
}

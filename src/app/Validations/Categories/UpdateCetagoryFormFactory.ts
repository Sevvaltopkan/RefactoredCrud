import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UpdateCategoryRequestModel } from "../../Models/Categories/UpdateCategoryRequestModel";
import { baseCategoryForm, BaseCategoryForm } from "./BaseCategoryFormFactory";


export type UpdateCetagoryForm = FormGroup<{
    id: FormControl<number>;
    name: FormControl<string>;
    description: FormControl<string>;
}>;

export function updateCetagoryForm(){
    const base = baseCategoryForm();

    base.name.addValidators([Validators.maxLength(50)]);

    base.name.updateValueAndValidity({emitEvent:false});

    return new FormGroup({
        id: new FormControl(0, {
            
            validators: [Validators.required, Validators.min(1)],
            nonNullable:true
        }),
        ...base,
    });
}

export function toUpdateCategoryRequest(form:UpdateCetagoryForm): UpdateCategoryRequestModel{
    return{
        id: form.controls.id.value,
        categoryName: form.controls.name.value,
        description: form.controls.description.value,
    };
}
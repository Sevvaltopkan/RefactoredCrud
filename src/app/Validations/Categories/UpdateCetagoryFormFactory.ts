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
}
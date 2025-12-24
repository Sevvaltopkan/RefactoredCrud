import { FormControl } from "@angular/forms";
import { ProductValidators } from "./ProductValidators";

export type BaseProductForm = {
    name: FormControl<string>;
    unitPrice: FormControl<number>;
    categoryId: FormControl<number | null>;
};

export function baseProductForm(): BaseProductForm {
    return {
        name: new FormControl<string>('', { nonNullable: true, validators: ProductValidators.name() }),
        unitPrice: new FormControl<number>(0, { nonNullable: true, validators: ProductValidators.unitPrice() }),
        categoryId: new FormControl<number | null>(null, { validators: ProductValidators.categoryId() }),
    }
}

import { Validators, ValidatorFn } from "@angular/forms";

export const ProductValidators = {
    name: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(3),
    ],
    unitPrice: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(0),
    ],
    categoryId: (): ValidatorFn[] => [],
};

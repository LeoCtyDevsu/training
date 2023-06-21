import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minCheckValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const groups = (control as FormArray).controls as FormGroup[];
    let total: number = 0;
    if (groups.length > 0) {
      Object.keys(groups[0].controls).forEach((key) => {
        if (groups[0].controls[key].value) {
          total += 1;
        }
      });
    }
    return total < minValue ? { minCheckbox: true } : null;
  };
}

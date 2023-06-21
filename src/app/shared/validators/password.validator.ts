import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasMinLenght = /.{8,}/.test(value);
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasSpecialCharactersCase = /[!@#\$%\^\&*\)\(+=._-]/.test(value);
    const hasNumeric = /\d+/.test(value);
    const passwordValid =
      hasUpperCase && hasSpecialCharactersCase && hasNumeric && hasMinLenght;
    return !passwordValid ? { passwordStrength: true } : null;
  };
}

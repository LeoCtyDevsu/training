import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'custom-text-area',
  templateUrl: './custom-text-area.component.html',
  styleUrls: ['./custom-text-area.component.scss'],
})
export class CustomTextAreaComponent implements ControlValueAccessor {
  @Input() idElement: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errors?: ValidationErrors | null;
  onChange = (value: any) => {};
  onTouched = () => {};
  disabled = false;
  errorMenssage?: string;
  value: any = null;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validityError() {
    if (this.errors?.['required']) {
      this.errorMenssage = `Campo: ${this.label} es requerido.`;
    }
  }
}

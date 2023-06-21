import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'custom-text-area',
  templateUrl: './custom-text-area.component.html',
  styleUrls: ['./custom-text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomTextAreaComponent),
    },
  ],
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

  validityError(value: string) {
    this.value = value;
    this.onChange(value);
    if (this.errors?.['required']) {
      this.errorMenssage = `Campo: ${this.label} es requerido.`;
    }
  }
}

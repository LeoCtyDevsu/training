import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomCheckboxComponent),
    },
  ],
})
export class CustomCheckboxComponent implements ControlValueAccessor{
  @Input() idElement: string = '';
  @Input() label: string = '';
  @Input() class: string = '';
  @Input() value: any;
  @Output() onClickEvent: EventEmitter<boolean> = new EventEmitter();
  onChange = (value: any) => {};
  onTouched = () => {};
  disabled = false;
  errorMenssage?: string;

  onClickEventNotification(value: string) {
    this.onClickEvent.emit(true);
  }

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
}

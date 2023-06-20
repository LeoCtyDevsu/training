import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomInputComponent),
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() idElement: string = '';
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formParent?: FormGroup | null;
  @Input() errors?: ValidationErrors | null;
  @Output() onKeyupEvent: EventEmitter<string | null> = new EventEmitter();
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

  onKeyupEventNotification(value: string | null) {
    this.onKeyupEvent.emit(value);
    this.value = value;
    this.onChange(value);
    this.validityError();
  }

  validityError() {
    switch (true) {
      case this.errors?.['required']: {
        this.errorMenssage = `Campo: ${this.label} es requerido.`;
        break;
      }
      case this.errors?.['email']: {
        this.errorMenssage = `El formato del correo no es correcto.`;
        break;
      }
      case this.errors?.['passwordStrength']: {
        this.errorMenssage = `La contraseña debe tener un mínimo de 8 caracteres, un carácter en mayúscula, un carácter numérico y un carácter especial.`;
        break;
      }
      case this.formParent?.errors?.['notSame']: {
        this.errorMenssage = `Las contraseñas no coinciden.`;
        break;
      }
      case this.errors?.['usernameAlreadyExists']: {
        this.errorMenssage = `Nombre de usuario ocupado.`;
        break;
      }
      case this.errors?.['usernameNotExists']: {
        this.errorMenssage = `Nombre de usuario no existe.`;
        break;
      }
      case this.errors?.['pattern'] !== null: {
        this.errorMenssage = `Campo: ${this.label} no tiene el formato correcto.`;
        break;
      }
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputComponent } from './custom-input.component';
import { FormGroup, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { forwardRef } from '@angular/core';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => CustomInputComponent),
        },
      ],
    });
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    component.idElement = 'custom-input-1';
    component.type = 'text';
    component.label = 'mockText';
    component.placeholder = 'mockPlaceholder';
    component.formParent = new FormGroup({});
    component.errors = { required: true };
    fixture.detectChanges();
  });

  it('create custom input', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-input"]')
    );
    const customLabel = debugElement.query(
      By.css('[data-testid="custom-label-input"]')
    );
    expect(customInput.attributes['id']).toBe(component.idElement);
    expect(customInput.attributes['type']).toBe(component.type);
    expect(customInput.attributes['placeholder']).toBe(component.placeholder);
    expect(customLabel.nativeElement.textContent).toBe(component.label);
  });

  it('click event', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-input"]')
    );
    let mockValue: string | null = '';
    component.onKeyupEvent.subscribe((res) => {
      mockValue = res;
    });
    customInput.triggerEventHandler('keyup', {});
    expect(mockValue).toBe('');
  });

  it('write a value', () => {
    component.writeValue('mockValue');
    expect(component.value).toBe('mockValue');
  });

  it('register on change function', () => {
    const functionTest = () => {
      return 'mockFunction';
    };
    component.registerOnChange(functionTest);
    expect(component.registerOnChange).toBeDefined();
    expect(component.onChange).toBe(functionTest);
  });

  it('register on touched function', () => {
    const functionTest = () => {
      return 'mockFunction';
    };
    component.registerOnTouched(functionTest);
    expect(component.registerOnTouched).toBeDefined();
    expect(component.onTouched).toBe(functionTest);
  });

  it('set disabled state function', () => {
    if (component.setDisabledState) {
      component.setDisabledState(true);
    }
    expect(component.setDisabledState).toBeDefined();
    expect(component.disabled).toBeTruthy();
  });

  it('validity error function with required error', () => {
    component.validityError();
    expect(component.validityError).toBeDefined();
    expect(component.errorMenssage).toBe('Campo: mockText es requerido.');
  });

  it('validity error function with email error', () => {
    component.errors = { email: true };
    fixture.detectChanges();
    component.validityError();
    expect(component.errorMenssage).toBe(
      'El formato del correo no es correcto.'
    );
  });

  it('validity error function with password strength error', () => {
    component.errors = { passwordStrength: true };
    fixture.detectChanges();
    component.validityError();
    expect(component.errorMenssage).toBe(
      'La contraseña debe tener un mínimo de 8 caracteres, un carácter en mayúscula, un carácter numérico y un carácter especial.'
    );
  });

  it('validity error function with password diferent error', () => {
    component.formParent = new FormGroup({});
    component.formParent.setErrors({ notSame: true });
    component.errors = {};
    fixture.detectChanges();
    component.validityError();
    expect(component.errorMenssage).toBe('Las contraseñas no coinciden.');
  });

  it('validity error function with user already exists error', () => {
    component.errors = { usernameAlreadyExists: true };
    fixture.detectChanges();
    component.validityError();
    expect(component.errorMenssage).toBe('Nombre de usuario ocupado.');
  });

  it('validity error function with user not exists error', () => {
    component.errors = { usernameNotExists: true };
    fixture.detectChanges();
    component.validityError();
    expect(component.errorMenssage).toBe('Nombre de usuario no existe.');
  });

  it('validity error function with pattern error', () => {
    component.errors = { pattern: true };
    fixture.detectChanges();
    component.validityError();
    expect(component.errorMenssage).toBe(
      'Campo: mockText no tiene el formato correcto.'
    );
  });
});

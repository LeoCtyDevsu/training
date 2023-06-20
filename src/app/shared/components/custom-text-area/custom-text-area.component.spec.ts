import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextAreaComponent } from './custom-text-area.component';
import { By } from '@angular/platform-browser';

describe('CustomTextAreaComponent', () => {
  let component: CustomTextAreaComponent;
  let fixture: ComponentFixture<CustomTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTextAreaComponent]
    });
    fixture = TestBed.createComponent(CustomTextAreaComponent);
    component = fixture.componentInstance;
    component.idElement = 'custom-input-1';
    component.label = 'mockText';
    component.placeholder = 'mockPlaceholder';
    component.errors = { required: true };
    fixture.detectChanges();
  });

  it('create custom text area', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-textarea"]')
    );
    const customLabel = debugElement.query(
      By.css('[data-testid="custom-label-textarea"]')
    );
    expect(customInput.attributes['id']).toBe('custom-input-1');
    expect(customInput.attributes['placeholder']).toBe('mockPlaceholder');
    expect(customLabel.nativeElement.textContent).toBe('mockText');
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
});

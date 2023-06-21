import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxComponent } from './custom-checkbox.component';
import { By } from '@angular/platform-browser';

describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxComponent;
  let fixture: ComponentFixture<CustomCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCheckboxComponent],
    });
    fixture = TestBed.createComponent(CustomCheckboxComponent);
    component = fixture.componentInstance;
    component.idElement = 'custom-checkbox-1';
    component.label = 'mockText';
    component.class = 'mockText';
    component.value = true;
    fixture.detectChanges();
  });

  it('create custom checkbox', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-checkbox"]')
    );
    const customLabel = debugElement.query(
      By.css('[data-testid="custom-label-checkbox"]')
    );
    expect(customInput.attributes['id']).toBe(component.idElement);
    expect(customInput.classes[component.class]).toBeTruthy();
    expect(customLabel.nativeElement.textContent).toBe(component.label);
  });

  it('click event', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-checkbox"]')
    );
    let mockValue: boolean = false;
    component.onClickEvent.subscribe((res) => {
      mockValue = res;
    });
    customInput.triggerEventHandler('click', {});
    expect(mockValue).toBeTruthy();
  });

  it('write a value', () => {
    component.writeValue(true);
    expect(component.value).toBeTruthy();
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
});

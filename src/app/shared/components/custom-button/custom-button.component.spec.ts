import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonComponent } from './custom-button.component';
import { By } from '@angular/platform-browser';
import { click } from '../../helpers/testing.helper';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomButtonComponent]
    });
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    component.class = 'mb-3';
    component.disabled = true;
    component.idElement = 'custom-button-1';
    component.label = 'button';
    component.type = 'secundary';
    fixture.detectChanges();
  });

  it('create custom button', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customButton = debugElement.query(
      By.css('[data-testid="custom-button"]')
    );
    const button = customButton.nativeElement as HTMLButtonElement;
    expect(customButton.classes['mb-3']).toBeTruthy();
    expect(customButton.classes['secundary']).toBeTruthy();
    expect(customButton.attributes['id']).toBe('custom-button-1');
    expect(button.disabled).toBeTruthy();
  });

  it('click event', () => {
    let state: boolean | undefined;
    component.onClickEvent.subscribe((res) => {
      state = res;
    });
    click(fixture, 'custom-button');
    expect(state).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelComponent } from './custom-label.component';
import { By } from '@angular/platform-browser';

describe('CustomLabelComponent', () => {
  let component: CustomLabelComponent;
  let fixture: ComponentFixture<CustomLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabelComponent]
    });
    fixture = TestBed.createComponent(CustomLabelComponent);
    component = fixture.componentInstance;
    component.idElement = 'custom-input-1';
    component.label = 'mockText';
    component.description = 'mockPlaceholder';
    component.isURL = true;
    fixture.detectChanges();
  });

  it('create custom label', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customLabel = debugElement.query(
      By.css('[data-testid="custom-label"]')
    );
    const customLabelDescriptionUrl = debugElement.query(
      By.css('[data-testid="custom-label-description-url"]')
    );
    expect(customLabel.attributes['id']).toBe(component.idElement);
    expect(customLabel.nativeElement.textContent).toBe(component.label + ':');
    expect(customLabelDescriptionUrl).toBeDefined();
    expect(customLabelDescriptionUrl.attributes['href']).toBe(component.description);
  });
});

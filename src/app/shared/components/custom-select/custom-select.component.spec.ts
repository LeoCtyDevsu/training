import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectComponent } from './custom-select.component';
import { SelectItem } from '../../models/select-item.model';
import { By } from '@angular/platform-browser';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;
  const mockItem: SelectItem = { value: 'mockValue', label: 'mockLabel' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSelectComponent],
    });
    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    component.idElement = 'custom-select-1';
    component.elements = [mockItem];
    component.label = 'mockText';
    fixture.detectChanges();
  });

  it('create custom select', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-select"]')
    );
    const customLabel = debugElement.query(
      By.css('[data-testid="custom-label-select"]')
    );
    expect(component.elements).toHaveLength(1);
    expect(customInput.attributes['id']).toBe('custom-select-1');
    expect(customLabel.nativeElement.textContent).toBe('mockText');
  });

  it('change event', () => {
    const { debugElement } = fixture;
    const customInput = debugElement.query(
      By.css('[data-testid="custom-select"]')
    );
    let mockValue: string | null = '';
    component.onChangeEvent.subscribe((res) => {
      mockValue = res;
    });
    customInput.triggerEventHandler('change', {});
    expect(mockValue).toBe('mockValue');
  });
});

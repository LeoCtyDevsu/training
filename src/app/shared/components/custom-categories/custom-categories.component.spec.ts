import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCategoriesComponent } from './custom-categories.component';
import { CategoryService } from '../../services/category.service';
import { By } from '@angular/platform-browser';
import { click } from '../../helpers/testing.helper';
import { categoryServiceMock } from '../../constants/mock.services';

describe('CustomCategoriesComponent', () => {
  let component: CustomCategoriesComponent;
  let fixture: ComponentFixture<CustomCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCategoriesComponent],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }],
    });
    fixture = TestBed.createComponent(CustomCategoriesComponent);
    component = fixture.componentInstance;
    component.selectedCategory = [1];
    fixture.detectChanges();
  });

  it('create custom categories component', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customCategories = debugElement.queryAll(
      By.css('[data-testid="custom-categories"]')
    );
    expect(customCategories).toHaveLength(1);
  });

  it('click event', () => {
    const { debugElement } = fixture;
    let categoryId: number | undefined;
    component.onClickEvent.subscribe((res) => {
      categoryId = res;
    });
    const customCategories = debugElement.queryAll(
      By.css('[data-testid="custom-categories"]')
    );
    customCategories[0].triggerEventHandler('onClickEvent');
    expect(categoryId).toBe(1);
  });

  it('check if is checked state', () => {
    const state = component.isChecked(1);
    expect(state).toBeTruthy();
  });

  it('fetching categories', () => {
    component.fetchCategories();
    expect(component.categories).toHaveLength(1);
  });
});

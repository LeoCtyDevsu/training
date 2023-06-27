import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { mockCategory } from 'src/app/shared/constants/mock.models';
import { categoryServiceMock } from 'src/app/shared/constants/mock.services';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router:Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: CategoryService, useValue: categoryServiceMock },
        SpinnerService,
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('click in register button', () => {
    const { debugElement } = fixture;
    const usernameInput = debugElement.query(
      By.css('[data-testid="username-input"]')
    );
    usernameInput.nativeElement.value = 'LeoCty';
    const mailInput = debugElement.query(By.css('[data-testid="mail-input"]'));
    mailInput.nativeElement.value = 'lcarmenaty@gmail.com.';
    const passwordInput = debugElement.query(
      By.css('[data-testid="password-input"]')
    );
    passwordInput.nativeElement.value = 'Qabalah10.';
    const checkboxs = debugElement.queryAll(
      By.css('[data-testid="category-checkbox"]')
    );
    const registerButton = debugElement.query(
      By.css('[data-testid="register-button"]')
    );
    (registerButton.nativeElement as HTMLButtonElement).click();
  });

  it('fetch categories', () => {
    expect(component.categories).toHaveLength(1);
  });

  it('generate categories controls', () => {
    component.generateCategoryControls();
    const controls = component.categoriesArray;
    expect(controls).toHaveLength(2);
  });

  it('select category', () => {
    component.selectCategory(mockCategory);
    expect(component.selectCategory).toHaveLength(1);
  });

  it('unselect category', () => {
    component.categoriesSelected = [mockCategory];
    component.selectCategory(mockCategory);
    expect(component.categoriesSelected).toHaveLength(0);
  });

  it('register', () => {
    jest.spyOn(window, 'alert');
    const navigateSpy = jest.spyOn(router,'navigate');
    component.categoriesSelected = [mockCategory];
    component.registerForm.patchValue({
      name: 'LeoCty',
      email: 'lcarmenaty@gmail.com',
      password: 'Qabalah10.',
      category: []
    });
    component.register();
    // expect(navigateSpy).toHaveBeenCalledWith(['/']);
    // expect(window.alert).toHaveBeenCalled();
  });

  it('get password control', () => {
    const control = component.getPasswordControl();
    expect(control).toBeDefined();
  });

  it('get username control error', () => {
    const errors = component.getUserNameControlError();
    expect(errors).toBeNull();
  });

  it('get email control error', () => {
    const errors = component.getEmailControlError();
    expect(errors).toBeNull();
  });

  it('get password control error', () => {
    const errors = component.getPasswordControlError();
    expect(errors).toBeNull();
  });

  it('get password confirm control error', () => {
    const errors = component.getConfirmPasswordControlError();
    expect(errors).toBeNull();
  });

  it('get form errors', () => {
    const errors = component.getRegisterFormErrors();
    expect(errors).toBeNull();
  });

  it('get min form errors', () => {
    const errors = component.getMinCheckbox();
    expect(errors).toBeTruthy();
  });
});

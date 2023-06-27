import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {
  authenticationServiceMock,
  userServiceMock,
} from 'src/app/shared/constants/mock.services';
import { UserService } from 'src/app/shared/services/user.service';
import { By } from '@angular/platform-browser';
import { inject } from '@angular/core';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      providers: [
        SpinnerService,
        Router,
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    });
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create signin component', () => {
    expect(component).toBeTruthy();
  });

  it('create main component', () => {
    const { debugElement } = fixture;
    const inputUsername = debugElement.query(
      By.css('[data-testid="input-username"]')
    );
    const inputPassword = debugElement.query(
      By.css('[data-testid="input-password"]')
    );
    const buttonSignin = debugElement.query(
      By.css('[data-testid="button-signin"]')
    );
    expect(inputUsername).toBeDefined();
    expect(inputPassword).toBeDefined();
    expect(buttonSignin).toBeDefined();
  });

  it('handle login function', () => {
    const { debugElement } = fixture;
    const inputUsername = debugElement.query(
      By.css('[data-testid="input-username"]')
    );
    inputUsername.nativeElement.value = 'LeoCty';
    const inputPassword = debugElement.query(
      By.css('[data-testid="input-password"]')
    );
    inputPassword.nativeElement.value = 'Qabalah10.';
    const buttonSignin = debugElement.query(
      By.css('[data-testid="button-signin"]')
    );
    buttonSignin.triggerEventHandler('onClickEvent', null);
  });

  it('get username controleError', () => {
    const error = component.getUsernameControlError();
    expect(error).toBeNull();
  })

  it('get password controleError', () => {
    const error = component.getPasswordControlError();
    expect(error).toBeNull();
  })
});

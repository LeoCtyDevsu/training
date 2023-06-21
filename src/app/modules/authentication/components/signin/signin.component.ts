import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Router } from '@angular/router';
import { NotUsernameValidator } from 'src/app/shared/validators/not-username.validator';
import { passwordStrengthValidator } from 'src/app/shared/validators/password.validator';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signinForm: FormGroup;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _authenticationService: AuthenticationService,
    private _userService: UserService,
    private _spinnerService: SpinnerService,
    private _router: Router
  ) {
    this.signinForm = new FormGroup({
      username: new FormControl(
        null,
        [Validators.required],
        [NotUsernameValidator.createValidator(this._authenticationService)]
      ),
      password: new FormControl(null, [
        Validators.required,
        passwordStrengthValidator(),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll();
  }

  unSubscribeAll() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  signIn() {
    this._spinnerService.show();
    const user: UserModel = this.signinForm.value;
    this._authenticationService
      .login(user)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this._userService.setUser(res);
        this._router.navigate(['/admin']);
      });
    this._spinnerService.hide();
  }

  getUsernameControlError() {
    const usernameControl = this.signinForm.get('username');
    return usernameControl?.dirty ? usernameControl?.errors : null;
  }

  getPasswordControlError() {
    const passwordControl = this.signinForm.get('password');
    return passwordControl?.dirty ? passwordControl?.errors : null;
  }
}

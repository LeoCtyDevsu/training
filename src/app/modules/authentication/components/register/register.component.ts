import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Router } from '@angular/router';
import { UsernameValidator } from 'src/app/shared/validators/username.validator';
import { passwordStrengthValidator } from 'src/app/shared/validators/password.validator';
import { minCheckValidator } from 'src/app/shared/validators/min-check.validator';
import { samePasswordStrengthValidator } from 'src/app/shared/validators/same-password.validator';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  categoriesForm = new FormGroup({});
  categories: CategoryModel[] = [];
  categoriesSelected: CategoryModel[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _authenticationService: AuthenticationService,
    private _categoryService: CategoryService,
    private _spinnerService: SpinnerService,
    private _router: Router
  ) {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl(
          null,
          [Validators.required],
          UsernameValidator.createValidator(this._authenticationService)
        ),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          passwordStrengthValidator(),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        categoriesArray: new FormArray([], [minCheckValidator(3)]),
      },
      {
        validators: samePasswordStrengthValidator,
      }
    );
  }

  ngOnInit(): void {
    this._spinnerService.show();
    this._categoryService
      .listCategories()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.categories = [...res];
        this.generateCategoryControls();
        this._spinnerService.hide();
      });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll();
  }

  unSubscribeAll() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get categoriesArray() {
    return this.registerForm.get('categoriesArray') as FormArray;
  }

  generateCategoryControls() {
    this.categories.forEach((category) => {
      const control = new FormControl(false, [Validators.required]);
      this.categoriesForm.addControl(category.description, control);
    });
    (this.registerForm.get('categoriesArray') as FormArray).push(
      this.categoriesForm
    );
  }

  selectCategory(category: CategoryModel) {
    const indexOf = this.categoriesSelected.indexOf(category);
    if (indexOf === -1) {
      this.categoriesForm.get(category.description)?.setValue(true);
      this.categoriesSelected.push(category);
    } else {
      this.categoriesForm.get(category.description)?.setValue(false);
      this.categoriesSelected.splice(indexOf, 1);
    }
  }

  register() {
    const user: UserModel = {
      name: this.registerForm.get('userName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      category: this.categoriesSelected.map((category) => category.id),
    };
    this._authenticationService.register(user).subscribe((res) => {
      window.alert(res);
      this._router.navigate(['/']);
    });
  }

  getPasswordControl() {
    return this.registerForm?.get('password');
  }

  getUserNameControlError() {
    const userNameControl = this.registerForm.get('userName');
    return userNameControl?.dirty ? userNameControl?.errors : null;
  }

  getEmailControlError() {
    const emailControl = this.registerForm.get('email');
    return emailControl?.dirty ? emailControl?.errors : null;
  }

  getPasswordControlError() {
    const passwordControl = this.registerForm.get('password');
    return passwordControl?.dirty ? passwordControl?.errors : null;
  }

  getConfirmPasswordControlError() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    return confirmPasswordControl?.dirty
      ? confirmPasswordControl?.errors
      : null;
  }

  getRegisterFormErrors() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    return confirmPasswordControl?.dirty && this.registerForm?.errors
      ? this.registerForm
      : null;
  }

  getMinCheckbox() {
    return (this.registerForm.get('categoriesArray') as FormArray).errors;
  }
}

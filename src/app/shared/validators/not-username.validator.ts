import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication.service";

export class NotUsernameValidator {
  static createValidator(
    _authenticationService: AuthenticationService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return _authenticationService.verifyUsername(control.value).pipe(
        map((result: boolean) => {
          return !result ? { usernameNotExists: true } : null;
        })
      );
    };
  }
}

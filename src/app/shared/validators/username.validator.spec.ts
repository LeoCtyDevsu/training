import { TestBed } from "@angular/core/testing";
import { UsernameValidator } from "./username.validator";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication.service";
import { authenticationServiceMock } from "../constants/mock.services";

describe('Username Validator', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock}
      ],
    });
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('Username validator', () => {
    expect(UsernameValidator.createValidator).toBeDefined();
  });

  it('Username validator verify', () => {
    const result = UsernameValidator.createValidator(authenticationService);
    expect(result).toBeDefined();
  });
});

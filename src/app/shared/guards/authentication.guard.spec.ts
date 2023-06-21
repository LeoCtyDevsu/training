import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { authenticationGuard } from './authentication.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { userServiceMock } from '../constants/mock.services';
import { fakeRouterState } from '../helpers/testing.helper';

describe('authenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authenticationGuard(...guardParameters));
  let dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock}
      ]
    });
  });

  it('created authentication guards', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('Method canActivate returns true', () => {
    let mockUrl = '/admin/books';
    let canActivate = executeGuard(dummyRoute, fakeRouterState(mockUrl));
    expect(canActivate).toBeTruthy();
  });
});

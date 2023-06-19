import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { mockUser, mockUserDefault } from '../constants/mock.models';
import { RouterModule } from '@angular/router';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
    });
    service = TestBed.inject(UserService);
  });

  it('created user service', () => {
    expect(service).toBeTruthy();
  });

  it('get user', () => {
    service.user$.subscribe((user) => {
      expect(user).toBe(mockUser);
    });
  });

  it('set user', () => {
    service.setUser(mockUserDefault);
    const user = service.getUser();
    expect(user).toBe(mockUserDefault);
  });

  it('set token', () => {
    service.setToken('mockTokenDefault');
    const token = service.getToken();
    expect(token).toBe('mockTokenDefault');
  });
});

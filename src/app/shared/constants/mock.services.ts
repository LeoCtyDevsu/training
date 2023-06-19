import { BehaviorSubject, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { mockUser } from './mock.models';

export const userServiceMock = {
  userSubject: new BehaviorSubject<UserModel>(mockUser),
  user$: of(mockUser),
  setUser: (user: UserModel): void => {
    userServiceMock.userSubject.next(user);
  },
  getUser: (): UserModel => {
    return mockUser;
  },
  getToken: (): string | null => {
    return sessionStorage.getItem('token');
  },
  setToken: (token: string): void => {
    sessionStorage.setItem('token', token ?? '');
  }
};

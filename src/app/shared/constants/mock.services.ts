import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { mockCategory, mockUser } from './mock.models';
import { CategoryModel } from '../models/category.model';

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

export const catagoryServiceMock = {
  listCategories: ():Observable<CategoryModel[]> => {
    return of([mockCategory]);
  }
}

import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { mockBook, mockCategory, mockUser } from './mock.models';
import { CategoryModel } from '../models/category.model';
import { BookModel } from '../models/book.model';

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
    return 'token';
  },
  setToken: (token: string): void => {
    sessionStorage.setItem('token', token ?? '');
  },
};

export const catagoryServiceMock = {
  listCategories: (): Observable<CategoryModel[]> => {
    return of([mockCategory]);
  },
};

export const bookServiceMock = {
  getBook: (id: string): Observable<BookModel> => {
    return of(mockBook);
  }
};

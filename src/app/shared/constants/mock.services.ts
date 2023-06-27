import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { mockBook, mockCategory, mockUser } from './mock.models';
import { CategoryModel } from '../models/category.model';
import { BookModel } from '../models/book.model';
import { inject, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';

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

export const categoryServiceMock = {
  listCategories: (): Observable<CategoryModel[]> => {
    return of([mockCategory]);
  },
};

export const bookServiceMock = {
  getBook: (id: string): Observable<BookModel> => {
    return of(mockBook);
  },
  listBooks: (): Observable<BookModel[]> => {
    return of([mockBook]);
  },
  registerBook: (book: BookModel): Observable<any> => {
    return of('Registro');
  }
};

export const authenticationServiceMock = {
  login: (userModel: UserModel): Observable<UserModel> => {
    return of(mockUser);
  },
  register: (userModel: UserModel): Observable<UserModel> => {
    return of(mockUser);
  },
  verifyUsername: (username: string): Observable<boolean> => {
    return of(true);
  },
};

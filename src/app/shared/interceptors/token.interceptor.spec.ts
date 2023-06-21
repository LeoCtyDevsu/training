import {
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect, jest } from '@jest/globals';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { userServiceMock } from '../constants/mock.services';
import { UserService } from '../services/user.service';
import { tokenInterceptor } from './token.interceptor';

describe('tokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => tokenInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        provideHttpClient(withInterceptors([tokenInterceptor])),
      ],
    });
  });

  it('created token interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('verify header authorization', () => {
    const url = `${environment.API_URL}/books/owner`;
    const mockHandler: HttpHandlerFn = () => {
      return of(
        new HttpResponse({
          status: 200,
          body: { data: 'thisIsWhatImTesting' },
        })
      );
    };
    const mockObject = { mockHandler };
    let mockRequest = new HttpRequest<any>('GET', url);
    jest.spyOn(mockObject, 'mockHandler').mockReturnThis();
    interceptor(mockRequest, mockHandler).subscribe();
  });
});

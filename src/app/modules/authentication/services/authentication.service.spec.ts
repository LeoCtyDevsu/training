import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockUser, mockUserDataResponse } from 'src/app/shared/constants/mock.models';
import { environment } from 'src/environments/environment.development';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;
  const mockUsername = 'mockUsername';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('created authentication service', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    service.login(mockUser).subscribe((res) => {
      expect(res).toEqual(mockUserDataResponse);
    });
    const url = `${environment.API_URL}/users/login`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockUserDataResponse);
  });

  it('login fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/users/login`;

    service.login(mockUser).subscribe({
      next: () => fail('have failed with the 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.error).toEqual(errorMessage);
      },
      complete: () => fail('have failed with the 500 error'),
    });
    const request = httpTestingController.expectOne(url);
    request.flush(errorMessage, { status, statusText });
  });

  it('register', () => {
    service.register(mockUser).subscribe((res) => {
      expect(res).toEqual(mockUserDataResponse);
    });
    const url = `${environment.API_URL}/users/create`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockUserDataResponse);
  });

  it('register fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/users/create`;

    service.register(mockUser).subscribe({
      next: () => fail('have failed with the 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.error).toEqual(errorMessage);
      },
      complete: () => fail('have failed with the 500 error'),
    });
    const request = httpTestingController.expectOne(url);
    request.flush(errorMessage, { status, statusText });
  });

  it('verify username', () => {
    service.verifyUsername(mockUsername).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const url = `${environment.API_URL}/users/exist-name?name=${mockUsername}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(true);
  });

  it('verify username fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/users/exist-name?name=${mockUsername}`;

    service.verifyUsername(mockUsername).subscribe({
      next: () => fail('have failed with the 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.error).toEqual(errorMessage);
      },
      complete: () => fail('have failed with the 500 error'),
    });
    const request = httpTestingController.expectOne(url);
    request.flush(errorMessage, { status, statusText });
  });
});

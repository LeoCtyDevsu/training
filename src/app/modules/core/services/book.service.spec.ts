import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockBook } from 'src/app/shared/constants/mock.models';
import { environment } from 'src/environments/environment.development';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;
  const bookId = '23456';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('created book service', () => {
    expect(service).toBeTruthy();
  });

  it('list books', () => {
    service.listBooks().subscribe((res) => {
      expect(res).toEqual([mockBook]);
    });
    const url = `${environment.API_URL}/books/owner`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([mockBook]);
  });

  it('list books fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/books/owner`;

    service.listBooks().subscribe({
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

  it('get books', () => {
    service.getBook(bookId).subscribe((res) => {
      expect(res).toEqual(mockBook);
    });
    const url = `${environment.API_URL}/books/owner`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBook);
  });

  it('get books fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/books/owner`;

    service.getBook(bookId).subscribe({
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

  it('register books', () => {
    service.registerBook(mockBook).subscribe((res) => {
      expect(res).toEqual(mockBook);
    });
    const url = `${environment.API_URL}/books/owner`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockBook);
  });

  it('register books fail', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/books/owner`;

    service.registerBook(mockBook).subscribe({
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

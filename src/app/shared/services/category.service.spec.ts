import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';
import { mockCategory } from '../constants/mock.models';
import { CategoryService } from './category.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    categoryService = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('created category service', () => {
    expect(categoryService).toBeTruthy();
  });

  it('list categories', () => {
    categoryService.listCategories().subscribe((categories) => {
      expect(categories).toBeTruthy();
      expect(categories.length).toBe(1);
      expect(categories).toEqual([mockCategory]);
    });
    const url = `${environment.API_URL}/category`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([mockCategory]);
  });

  it('list categories fail', () => {
    categoryService.listCategories().subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.error).toEqual(errorMessage);
      },
      complete: () => fail('should have failed with the 500 error'),
    });
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorMessage = 'API error';
    const url = `${environment.API_URL}/category`;
    const request = httpTestingController.expectOne(url);
    request.flush(errorMessage, { status, statusText });
  });
});

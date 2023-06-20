import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ResolveFn, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookModel } from '../models/book.model';
import { bookResolver } from './book.resolver';
import { BookService } from 'src/app/modules/core/services/book.service';
import { bookServiceMock } from '../constants/mock.services';
import { Observable } from 'rxjs';
import { mockBook } from '../constants/mock.models';
import { fakeRouterState } from '../helpers/testing.helper';

describe('bookResolver', () => {
  const executeResolver: ResolveFn<BookModel> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => bookResolver(...resolverParameters));
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 'one-id' }) },
          },
        },
        { provide: BookService, useValue: bookServiceMock },
      ],
    });
    route = TestBed.inject(ActivatedRoute);
  });

  it('created book resolver', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('resolve a book', () => {
    let mockUrl = '/admin/books/view/12122';
    let book = executeResolver(route.snapshot, fakeRouterState(mockUrl));
    (book as Observable<BookModel>).subscribe((b) => {
      expect(b).toEqual(mockBook);
    });
  });
});


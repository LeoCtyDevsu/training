import { ResolveFn } from '@angular/router';
import { BookModel } from '../models/book.model';
import { BookService } from 'src/app/modules/core/services/book.service';
import { inject } from '@angular/core';

export const bookResolver: ResolveFn<BookModel> = (route, state) => {
  const bookService = inject(BookService);
  const bookId = route.paramMap.get('id');
  const book = bookService.getBook(bookId ?? '');
  return book;
};

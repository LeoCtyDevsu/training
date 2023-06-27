import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BookModel } from 'src/app/shared/models/book.model';
import { SelectItem } from 'src/app/shared/models/select-item.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
})
export class MyBooksComponent implements OnInit, OnDestroy {
  categories: SelectItem[] = [];
  books: BookModel[] = [];
  allBooks: BookModel[] = [];
  private ngUnsubscribeCategory = new Subject<void>();
  private ngUnsubscribeBook = new Subject<void>();

  constructor(
    private _bookService: BookService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchBooks();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    this.ngUnsubscribeCategory.next();
    this.ngUnsubscribeCategory.complete();
    this.ngUnsubscribeBook.next();
    this.ngUnsubscribeBook.complete();
  }

  fetchCategories() {
    this._categoryService
      .listCategories()
      .pipe(takeUntil(this.ngUnsubscribeCategory))
      .subscribe((res) => {
        this.categories = res.map((category) => {
          return {
            label: category.description,
            value: category.id.toString(),
          } as SelectItem;
        });
      });
  }

  fetchBooks() {
    this._bookService
      .listBooks()
      .pipe(takeUntil(this.ngUnsubscribeBook))
      .subscribe((res) => {
        this.books = [...res];
        this.allBooks = [...res];
      });
  }

  filterByTitle(value: string | null) {
    if (value && value != '') {
      this.books = this.allBooks.filter((book) =>
        book.title?.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.books = [...this.allBooks];
    }
  }

  filterByCategory(value: string) {
    if (value && value != '') {
      this.books = this.allBooks.filter((book) =>
        book.category?.includes(Number(value))
      );
    } else {
      this.books = [...this.allBooks];
    }
  }
}

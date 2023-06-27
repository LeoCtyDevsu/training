import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BookModel } from 'src/app/shared/models/book.model';
import { SelectItem } from 'src/app/shared/models/select-item.model';
import { BookService } from '../../services/book.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  categories: SelectItem[] = [];
  books: BookModel[] = [];
  allBooks: BookModel[] = [];
  filterBooks: BookModel[] = [];
  selectedCategories: number[] = [];
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
        this.books = [...res.slice(0, 4)];
        this.allBooks = [...res.filter((book) => book.public)];
        this.filterBooks = [...res.filter((book) => book.public)];
      });
  }

  filterByTitle(value: string | null) {
    if (value && value != '') {
      this.filterBooks = this.allBooks.filter((book) =>
        book.title?.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filterBooks = [...this.allBooks];
    }
  }

  categorySelected(id: number) {
    const indexOf = this.selectedCategories.indexOf(id);
    if (indexOf < 0) {
      this.selectedCategories.push(id);
    } else {
      this.selectedCategories.splice(indexOf, 1);
    }
    this.filterCategories();
  }

  filterCategories() {
    if (this.selectedCategories.length === 0) {
      this.filterBooks = [...this.allBooks];
    } else {
      this.filterBooks = [];
      this.selectedCategories.forEach((categoryId) => {
        const books = this.allBooks.filter((book) =>
          book.category?.includes(categoryId)
        );
        this.filterBooks = [...this.filterBooks, ...books];
        this.filterBooks = this.arrayUnique(this.filterBooks);
      });
    }
  }

  arrayUnique(array: any[]) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }
}

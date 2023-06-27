import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BookModel } from 'src/app/shared/models/book.model';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss']
})
export class DetailBookComponent implements OnInit, OnDestroy {
  book: BookModel = {};
  categories: CategoryModel[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this._spinnerService.show();
    this.fetchCategories();
    this.book = this._route.snapshot.data['book'];
    this._spinnerService.hide();
  }

  ngOnDestroy(): void {
    this.UnsubscribeAll();
  }

  UnsubscribeAll() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  fetchCategories() {
    this._categoryService
      .listCategories()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.categories = [...res];
      });
  }

  getBookCategoriesNames() {
    let booksNames = '';
    this.book.category?.forEach(categoryId => {
      const findCategory = this.categories.find(category => category.id === categoryId);
      booksNames += findCategory?.description + ', ';
    });
    return booksNames;
  }
}

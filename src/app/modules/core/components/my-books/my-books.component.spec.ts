import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksComponent } from './my-books.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import {
  bookServiceMock,
  categoryServiceMock,
} from 'src/app/shared/constants/mock.services';
import { CategoryService } from 'src/app/shared/services/category.service';

describe('MyBooksComponent', () => {
  let component: MyBooksComponent;
  let fixture: ComponentFixture<MyBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBooksComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: BookService, useValue: bookServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
    });
    fixture = TestBed.createComponent(MyBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetch categories', () => {
    component.fetchCategories();
    expect(component.categories).toHaveLength(1);
  });

  it('fetch books', () => {
    component.fetchBooks();
    expect(component.books).toHaveLength(1);
    expect(component.allBooks).toHaveLength(1);
  });

  it('filter books by title by null', () => {
    component.filterByTitle(null);
    expect(component.books).toHaveLength(1);
  });

  it('filter books by title by title', () => {
    component.filterByTitle('No title');
    expect(component.books).toHaveLength(0);
  });

  it('filter books by category by null', () => {
    component.filterByTitle(null);
    expect(component.books).toHaveLength(1);
  });

  it('filter books by category by id', () => {
    component.filterByTitle('4');
    expect(component.books).toHaveLength(0);
  });
});

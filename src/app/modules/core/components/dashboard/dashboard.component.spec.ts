import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  bookServiceMock,
  categoryServiceMock,
} from 'src/app/shared/constants/mock.services';
import { CategoryService } from 'src/app/shared/services/category.service';
import { BookService } from '../../services/book.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: BookService, useValue: bookServiceMock },
        HttpClient,
        HttpHandler,
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
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
    expect(component.filterBooks).toHaveLength(1);
  });

  it('filter books by title by title', () => {
    component.filterByTitle('No title');
    expect(component.filterBooks).toHaveLength(0);
  });

  it('category selected', () => {
    component.categorySelected(1);
    expect(component.selectedCategories).toHaveLength(1);
  });

  it('filter categories', () => {
    component.filterCategories();
    expect(component.filterBooks).toHaveLength(1);
  });

  it('unique values', () => {
    const array = component.arrayUnique([1, 1, 2, 3]);
    expect(array).toHaveLength(3);
  });
});

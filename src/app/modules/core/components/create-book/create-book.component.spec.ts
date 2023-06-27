import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { mockBook } from 'src/app/shared/constants/mock.models';
import { CreateBookComponent } from './create-book.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import {
  bookServiceMock,
  categoryServiceMock,
} from 'src/app/shared/constants/mock.services';
import { BookService } from '../../services/book.service';

describe('CreateBookComponent', () => {
  let component: CreateBookComponent;
  let fixture: ComponentFixture<CreateBookComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      data: {
        book: mockBook,
      },
    },
  } as unknown as ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBookComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: BookService, useValue: bookServiceMock },
        HttpClient,
        HttpHandler,
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CreateBookComponent);
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

  it('check book', () => {
    component.checkBook();
    const control = component.bookForm.get('title');
    expect(control?.value).toBe('mockBook');
  });

  it('check categories', () => {
    component.book = mockBook;
    component.checkCategories();
    expect(component.categoriesSelected).toHaveLength(3);
  });

  it('select public', () => {
    component.selectPublic();
    const control = component.bookForm.get('public');
    expect(control?.value).toBeFalsy();
  });

  it('register', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.categoriesSelected = [1];
    component.bookForm.patchValue({
      title: 'mockData',
      author: 'mockData',
      resume: 'mockData',
      image: 'mockData',
      url: 'mockData',
      public: true,
    });
    component.registerBook();
    // expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('get title control error', () => {
    const error = component.getTitleControlErrors();
    expect(error).toBeNull();
  });

  it('get author control error', () => {
    const error = component.getAuthorControlErrors();
    expect(error).toBeNull();
  });

  it('get URL control error', () => {
    const error = component.getURLControlErrors();
    expect(error).toBeNull();
  });

  it('category selected', () => {
    component.categorySelected(1);
    expect(component.categoriesSelected).toHaveLength(2);
  });

  it('category unselected', () => {
    component.categorySelected(4);
    expect(component.categoriesSelected).toHaveLength(4);
  });
});

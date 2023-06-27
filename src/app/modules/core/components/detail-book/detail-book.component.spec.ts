import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookComponent } from './detail-book.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { mockBook } from 'src/app/shared/constants/mock.models';

describe('DetailBookComponent', () => {
  let component: DetailBookComponent;
  let fixture: ComponentFixture<DetailBookComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      data: {
        book: mockBook,
      },
    },
  } as unknown as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBookComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(DetailBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

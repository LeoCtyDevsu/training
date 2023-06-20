import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookModel } from 'src/app/shared/models/book.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  listBooks(): Observable<BookModel[]> {
    return this._httpClient.get<BookModel[]>(
      environment.API_URL + '/books/owner'
    );
  }

  getBook(id: string): Observable<BookModel> {
    return this._httpClient
      .get(environment.API_URL + '/books/owner')
      .pipe(map((res: any) => res.find((book: any) => book.id === id)));
  }

  registerBook(book: BookModel): Observable<any> {
    return this._httpClient.post<any>(
      environment.API_URL + '/books/owner',
      book
    );
  }
}

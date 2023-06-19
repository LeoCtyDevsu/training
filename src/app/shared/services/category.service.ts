import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  listCategories(): Observable<CategoryModel[]> {
    return this._httpClient.get<CategoryModel[]>(environment.API_URL + '/category');
  }
}

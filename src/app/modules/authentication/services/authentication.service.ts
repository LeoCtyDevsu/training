import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) {}

  login(user: UserModel): Observable<UserModel> {
    return this._httpClient
      .post(environment.API_URL + '/users/login', {
        username: user.username,
        password: user.password,
      })
      .pipe(map((res: any) => {
        return {
          accessToken: res?.access_token,
          tokenType: res?.tokenType,
          userId: res?.user?.userId,
          username: res?.user?.username
        } as UserModel;
      }));
  }

  register(user: UserModel) {
    return this._httpClient.post(
      environment.API_URL + '/users/create',
      user
    );
  }

  verifyUsername(username: string): Observable<boolean> {
    return this._httpClient
      .get<any>(environment.API_URL + `/users/exist-name?name=${username}`)
      .pipe(
        map((res) => {
          return res?.exists as boolean;
        })
      );
  }
}

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/shell/src/environments/environment';
import { JWTToken } from '../models/jwt-token';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  public baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) { }

  public login(values: any): Observable<JWTToken> {
    return this.http.post<JWTToken>(this.baseUrl + 'login', values).pipe(
      map((token: JWTToken) => {
        localStorage.setItem('jwtToken', token.jwtToken);
        return token;
      })
    );
  }

  public register(values: any): Observable<JWTToken> {
    return this.http.post<JWTToken>(this.baseUrl + 'register', values).pipe(
      map((token: JWTToken) => {
        localStorage.setItem('jwtToken', token.jwtToken);
        return token;
      })
    );
  }
}
















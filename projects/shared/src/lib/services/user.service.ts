import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { User } from "../models/user";
import { environment } from "projects/shell/src/environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
  public baseUrl = environment.apiUrl + "user/";

  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public getCurrentUser(): Observable<any> {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    
    return this.http
      .get<User>(this.baseUrl + "getCurrentUser")
      .pipe(
        map((user: User) => {
          if (user) {
            this.currentUserSource.next(user);
          }
        })
      );
  }

  public getCurrentUserFriends(): Observable<any> {
    return this.http
    .get<User>(this.baseUrl + "getFriends")
    .pipe(
     // To Do
    );
  }

  public logout(): void {
    localStorage.removeItem("jwtToken");
    this.currentUserSource.next(null);
  }
}

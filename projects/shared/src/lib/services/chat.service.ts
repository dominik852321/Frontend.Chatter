import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ChatService {

  // private currentUserSource = new ReplaySubject<User>(1);
  // public currentUser$ = this.currentUserSource.asObservable();
  
  // constructor(private http: HttpClient) { }

  // public getCurrentUser(): Observable<any> {
  //   const jwtToken = localStorage.getItem("jwtToken");
  //   if (jwtToken === null) {
  //     this.currentUserSource.next(null);
  //     return of(null);
  //   }
    
  //   return this.http
  //     .get<User>(this.baseUrl + "getCurrentUser")
  //     .pipe(
  //       map((user: User) => {
  //         if (user) {
  //           this.currentUserSource.next(user);
  //         }
  //       })
  //     );
  // }

  // public getCurrentUserFriends(): Observable<any> {
  //   return this.http
  //   .get<User>(this.baseUrl + "getFriends")
  //   .pipe(
  //    // To Do
  //   );
  // }

  
}
















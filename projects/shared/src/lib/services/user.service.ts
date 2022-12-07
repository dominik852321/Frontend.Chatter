import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { environment } from "projects/shell/src/environments/environment";
import { AcceptFriendForm, FriendRequestForm, User, UserPasswordChange, UserPhoto, UserProfile } from "@shared";

@Injectable()
export class UserService {
  private baseUrl = environment.apiUrl + "user/";

  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<any> {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    return this.http.get<User>(this.baseUrl + "getCurrentUser").pipe(
      map((user: User) => {
        if (user) {
          this.currentUserSource.next(user);
        }
      })
    );
  }

  public searchFriendsByName(
    userName: string,
    page: number = 1
  ): Observable<User[]> {
    const params = new HttpParams().set("query", userName).set("page", page);
    return this.http.get<User[]>(this.baseUrl + "searchUsers", { params });
  }

  public addUser(friendRequestForm: FriendRequestForm): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "createFriendRequest",
      friendRequestForm
    );
  }

  public acceptFriend(acceptFriendForm: AcceptFriendForm): Observable<any> {
    return this.http.post<any>(this.baseUrl + "acceptFriend", acceptFriendForm);
  }

  public updateUserProfile(userProfile: UserProfile): Observable<any> {
    return this.http.post<any>(this.baseUrl + "updateProfile", userProfile);
  }

  public updateUserPassword(userPassword: UserPasswordChange): Observable<any> {
    return this.http.post<any>(this.baseUrl + "updateUserPassword", userPassword);
  }

  public updateUserPhoto(userPhoto: UserPhoto): Observable<any> {
    return this.http.post<any>(this.baseUrl + "updateProfilePicture", userPhoto);
  }

  public logoutCurrentUser(): void {
    localStorage.removeItem("jwtToken");
    this.currentUserSource.next(null);
  }
}

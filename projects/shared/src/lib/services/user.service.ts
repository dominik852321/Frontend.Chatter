import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { combineLatest, Observable, of, ReplaySubject } from "rxjs";
import { environment } from "projects/shell/src/environments/environment";
import { Friend, FriendRequest, User } from "../models/user";
import { FriendRequestForm } from "../models/Dtos/friend-request-dto";
import { AcceptFriendForm } from "../models/Dtos/accept-friend-dto";
import { ChangeUserName } from "../models/Dtos/change-user-name";
import { UserPasswordChange } from "../models/Dtos/user-password-change";

@Injectable({
  providedIn: "root",
})
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

    return combineLatest([
      this.getCurrentUserProfile(),
      this.getCurrentUserFriends(),
      this.getCurrentFriendRequests(),
    ]).pipe(
      map(([user, friends, friendRequests]) => {
        if (!user.profilePictureUrl) {
          user.profilePictureUrl = "../../assets/img/default-photo.png";
        }
        user.friends = friends;
        user.friendRequests = friendRequests;
        this.currentUserSource.next(user);
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

  public updateUserProfile(changeUserName: ChangeUserName): Observable<any> {
    return this.http.post<any>(this.baseUrl + "updateProfile", changeUserName);
  }

  public updateUserPhoto(newPhoto: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", newPhoto, newPhoto.name);
    return this.http.post<any>(this.baseUrl + "updateProfilePicture", formData);
  }

  public logoutCurrentUser(): void {
    localStorage.removeItem("jwtToken");
    this.currentUserSource.next(null);
  }

  private getCurrentUserProfile() {
    return this.http.get<User>(this.baseUrl + "getCurrentUser");
  }

  private getCurrentUserFriends() {
    return this.http.get<Friend[]>(this.baseUrl + "getFriends");
  }

  private getCurrentFriendRequests() {
    return this.http.get<FriendRequest[]>(
      this.baseUrl + "getFriendRequests"
    );
  }
}

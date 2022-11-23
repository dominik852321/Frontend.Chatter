import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "projects/shell/src/environments/environment";
import { Observable } from "rxjs";
import { UserProfile } from "../models/user";

@Injectable()
export class ProfileService {
  public baseUrl = environment.apiUrl + "profile/";

  constructor(private http: HttpClient, private router: Router) {}

  public updateProfile(user: UserProfile){
    return this.http.put<UserProfile>(this.baseUrl + "/update", user);
  }

  public getProfile(id:string): Observable<UserProfile>  {
    return this.http.get<UserProfile>(this.baseUrl + id)
  }
}

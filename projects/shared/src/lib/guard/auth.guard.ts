import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(["account/login"]);
          return false;
        }
      })
    );
  }
}

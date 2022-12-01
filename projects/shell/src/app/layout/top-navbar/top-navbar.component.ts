import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styles: [".navbar { height: 10vh !important; z-index: 1}"],
})
export class TopNavbarComponent implements OnInit {
  public currentUserName$: Observable<string>;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.currentUserName$ = this.userService.currentUser$.pipe(
      map((user: User) => user?.userName)
    );
  }

  public logoutCurrentUser() {
    this.userService.logoutCurrentUser();
    this.toastr.success("User has been logout");
    this.router.navigateByUrl("account/login");
  }
}

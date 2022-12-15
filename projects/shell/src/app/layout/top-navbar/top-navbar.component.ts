import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styles: [".navbar { height: 70px; z-index: 1}"],
})
export class TopNavbarComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
  }

  public logoutCurrentUser() {
    this.userService.logoutCurrentUser();
    this.toastr.success("User has been logout");
  }
}

import { Component, OnInit } from "@angular/core";
import { Friend, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-left-sidebar",
  templateUrl: "./left-sidebar.component.html",
  styles: [],
})
export class LeftSidebarComponent implements OnInit {
  public currentUserFriends$: Observable<Friend[]>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.currentUserFriends$ = this.userService.currentUser$.pipe(
      map((user) => user.friends)
    );
  }
}

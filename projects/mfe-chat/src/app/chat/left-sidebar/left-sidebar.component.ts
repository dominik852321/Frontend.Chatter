import { Component, OnInit } from "@angular/core";
import { Friend, SignalrService, User, UserService } from "@shared";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-left-sidebar",
  templateUrl: "./left-sidebar.component.html",
  styles: [
    ".wrapper { height: calc(100vh - 70px) !important} .nav-link.active { background-color: rgba(255, 255, 255, 0.1) !important; color: #fff !important;} .status-badge{ display: block; width: 10px; height: 10px; background-color: red; border:.5px solid black; position: relative; top: 18px; left: 18px;} li.nav-item {height: 50px} .online{ background-color: green } .offline{ background-color: red }",
  ],
})
export class LeftSidebarComponent implements OnInit {
  public currentUser$: Observable<User>;
  public currentRoomId: string;

  constructor(
    private userService: UserService,
    private signalrService: SignalrService
  ) {}

  public ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
    this.signalrService.createConnection();
  }

  public onSelectFriend(friend: Friend) {
    this.signalrService.changeRoom(friend.roomId);
    this.currentRoomId = friend.roomId;
  }
}

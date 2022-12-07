import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Friend, SignalrService, User, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: "app-left-sidebar",
  templateUrl: "./left-sidebar.component.html",
  styles: [
    ".wrapper { height: calc(100vh - 70px) !important} .nav-link.active { background-color: rgba(255, 255, 255, 0.1) !important; color: #fff !important;}",
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
    this.signalrService.createConnection();
    this.currentUser$ = this.userService.currentUser$;
  }

  public onSelectFriend(friend: Friend) {
    this.signalrService.changeRoom(friend.roomId);
    this.currentRoomId = friend.roomId;
  }
}

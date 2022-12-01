import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Friend, User, UserService } from "@shared";
import { ToastrService } from "ngx-toastr";
import { map, Observable } from "rxjs";
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: "app-left-sidebar",
  templateUrl: "./left-sidebar.component.html",
  styles: [".wrapper { height: 90vh !important}"],
})
export class LeftSidebarComponent implements OnInit {
  @ViewChild("chat") public chatComponent: ChatComponent;

  public currentUser$: Observable<User>;
  public currentUserFriends$: Observable<Friend[]>;
  public currentRoomId: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
    this.currentUserFriends$ = this.userService.currentUser$.pipe(
      map((user: User) => user?.friends)
    );
    this.currentUserFriends$.subscribe((friends) => {
      this.currentRoomId = friends[0]?.roomId;
    });
  }

  public onSelectFriend(friend: Friend) {
    this.currentRoomId = friend.roomId;
    this.changeDetectorRef.detectChanges();
    this.chatComponent.ngOnInit();
  }
}

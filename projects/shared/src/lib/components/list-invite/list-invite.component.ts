import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AcceptFriendForm, FriendRequest, User, UserService } from "@shared";
import { map, Observable, tap } from "rxjs";

@Component({
  selector: "lib-list-invite",
  templateUrl: "./list-invite.component.html",
  styles: [""],
})
export class ListInviteComponent implements OnInit {
  public currentFriendRequests$: Observable<FriendRequest[]>;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.currentFriendRequests$ = this.userService.currentUser$.pipe(
      map((user: User) =>
        user.friendRequests.filter(
          (x) => x.isAccepted !== true && x.senderId !== user.id
        )
      )
    );
  }

  public howLongAgo(dateTime: string): string {
    const requestDate = new Date(dateTime);
    const currentDate = new Date(new Date().toISOString());

    var diff = (currentDate.getTime() - requestDate.getTime()) / 1000;
    diff /= 60 * 60;

    return Math.abs(Math.round(diff)).toString();
  }

  public acceptFriend(id: string) {
    const acceptFriendForm = {} as AcceptFriendForm;
    acceptFriendForm.requestId = id;
    this.userService.acceptFriend(acceptFriendForm).subscribe((_) => {
      this.userService.getCurrentUser().subscribe();
    });
  }
}

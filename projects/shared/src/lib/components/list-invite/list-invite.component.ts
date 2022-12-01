import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FriendRequest, User, UserService } from "@shared";
import { map, Observable, tap } from "rxjs";
import { AcceptFriendForm } from "../../models/Dtos/accept-friend-dto";

@Component({
  selector: "lib-list-invite",
  templateUrl: "./list-invite.component.html",
  styles: [""],
})
export class ListInviteComponent implements OnInit {

  public currentUser: User;
  public currentFriendRequests: FriendRequest[];
  private acceptFriendForm: AcceptFriendForm;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: User) =>{
        this.currentUser = user;
        this.currentFriendRequests = user.friendRequests.filter((x) => x.isAccepted !== true && 
        x.senderId !== user.id);
      }
    );
  }

  public howLongAgo(dateTime: string): string {
    const howLong = new Date(
      new Date().getTime() - new Date(dateTime).getTime()
    ).getHours() - 1;
    return howLong.toString();
  }

  public acceptFriend(id: string) {
    this.acceptFriendForm = {} as AcceptFriendForm;
    this.acceptFriendForm.requestId = id;
    this.userService.acceptFriend(this.acceptFriendForm).subscribe((_) => {
      this.userService.getCurrentUser().subscribe();
    });
  }
}

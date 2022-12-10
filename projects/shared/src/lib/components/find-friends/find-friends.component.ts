import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith, tap } from "rxjs";
import { FriendRequestForm } from "../../models/Dtos/friend-request-dto";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "lib-find-friends",
  templateUrl: "./find-friends.component.html",
  styles: [
    ".example-form { min-width: 300px; max-width: 500px;width: 100%;} .example-full-width { width: 100%;} ::ng-deep.mat-form-field-infix { border-top: 0!important; }",
  ],
})
export class FindFriendsComponent implements OnInit {
  public searchFriends = new FormControl<string>("");
  public searched = false;

  private currentUser: User;
  public friendsOptions$: Observable<User[]>;


  constructor(private userService: UserService) {}

  public ngOnInit() {
    this.userService.currentUser$.subscribe(
      (user: User) => (this.currentUser = user)
    );

    this.searchFriends.valueChanges.subscribe((value) => {
      if (value?.length < 3) {
        this.searched = false;
        this.cleanSearch();
      } else if (value?.length === 3 && !this.searched) {
        this.searched = true;
        this.getFriendByName(value);
      } else if (value?.length > 3) {
        this.filterFriends(value);
      }
      return null;
    });
  }

  public addFriend(id: string) {
    const friendRequestForm = {} as FriendRequestForm;
    friendRequestForm.userId = id;
    this.userService.addUser(friendRequestForm).subscribe();
  }

  private getFriendByName(name: string): void {
    this.friendsOptions$ = this.userService
      .searchFriendsByName(name)
      .pipe(
        map((users) =>
          users.filter(
            (x) =>
              x.id !== this.currentUser.id &&
              !this.currentUser.friends
                .map((friends) => friends.id)
                .includes(x.id)
          )
        )
      );
  }

  private filterFriends(name: string): void {
    const filterValue = name.toLowerCase();
    this.friendsOptions$ = this.friendsOptions$.pipe(
      map((users: User[]) =>
        users.filter((option) =>
          option.userName.toLowerCase().includes(filterValue)
        )
      )
    );
  }

  private cleanSearch(): void {
    this.friendsOptions$ = null;
  }
}

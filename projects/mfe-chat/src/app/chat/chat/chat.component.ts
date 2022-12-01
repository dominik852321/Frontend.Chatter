import { Component, Input, OnInit } from "@angular/core";
import { ChatService, User, UserService } from "@shared";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styles: [],
})
export class ChatComponent implements OnInit {
  @Input() public currentUser$: Observable<User>;
  @Input() public currentRoomId: string;

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  public ngOnInit(): void {
    console.log(this.currentRoomId);
  }
}

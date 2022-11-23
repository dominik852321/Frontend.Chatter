import { Component, OnInit } from '@angular/core';
import { ChatService, User, UserService } from '@shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: ['.wrapper { height: 90vh !important}']
})
export class ChatComponent implements OnInit {
  public currentUser$: Observable<User>;

  public currentRoomId$: Observable<string>;


  constructor(private userService: UserService , private chatService: ChatService) { }

  public ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
  }
}

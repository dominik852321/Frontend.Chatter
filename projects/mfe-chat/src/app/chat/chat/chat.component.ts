import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ChatService, Message, Room, SignalrService, User } from "@shared";
import { catchError, forkJoin, map, Observable, of, Subscription } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styles: [],
})
export class ChatComponent implements OnChanges {
  @Input() public currentUser: User;
  @Input() public currentRoomId: string;


  public newMessage = new FormControl<string>("");
  public currentRoom: Room;
  public currentRoomMessages: Message[];
  public signalRSubscription$: Subscription;

  constructor(
    private chatService: ChatService,
    private signalrService: SignalrService
  ) {}

  public ngOnChanges(): void {
    this.signalRSubscription$?.unsubscribe();
    this.getRoomWithMessages(this.currentRoomId).subscribe();
  }

  public sendMessage(): void {
    if (this.newMessage.value.length > 0) {
      this.signalrService.sendMessage(
        this.currentRoomId,
        this.newMessage.value
      );
      this.newMessage = new FormControl<string>("");
    }
  }

  public convertDateTime(createdDate: string): string {
    return new Date(createdDate).toLocaleString();
  }

  public getSender(senderId: string, prop: string): string {
    const user = this.currentRoom.users.find((x) => x.id === senderId);
    switch (prop) {
      case "name": {
        return user?.userName;
      }
      case "photo": {
        return user?.profilePictureUrl ? user?.profilePictureUrl : "../../assets/img/default-photo.png";
      }
      default: {
        return "";
      }
    }
  }

  private getRoomWithMessages(roomId: string): Observable<void> {
    const getRoomRequest = this.chatService.getRoom(roomId);
    const getMessageInRoomRequest = this.chatService.getMessages(roomId);

    return forkJoin([getRoomRequest, getMessageInRoomRequest]).pipe(
      catchError((_) => {
        return of([]);
      }),
      map((results) => {
        const [currentRoom, currentRoomMessages] = results;
        this.currentRoom = currentRoom;
        this.currentRoomMessages = currentRoomMessages;
        this.subscribeCurrentRoomMessages();
        this.setRoomName();
      })
    );
  }

  private subscribeCurrentRoomMessages() {
    this.signalRSubscription$ =
      this.signalrService.currentRoomMessages$.subscribe((message: Message) => {
        if (message) {
          this.currentRoomMessages = [...this.currentRoomMessages, message];
        }
      });
  }

  private setRoomName() {
    if (this.currentRoom.name === "" || this.currentRoom.name === "default") {
      this.currentRoom.name = "";
      const usersWithoutCurrent = this.currentRoom.users.filter(x => x.id !== this.currentUser.id);
      for (let i = 0; i < usersWithoutCurrent.length; i++) {
        this.currentRoom.name += usersWithoutCurrent[i]?.userName;
        if (i+1 !== usersWithoutCurrent.length) {
          this.currentRoom.name += ", ";
        }
      }
    }
  }
}

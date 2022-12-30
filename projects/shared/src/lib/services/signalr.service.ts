import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "projects/shell/src/environments/environment";
import { BehaviorSubject, map, ReplaySubject } from "rxjs";
import { Message } from "../models/message";
import { Friend, User } from "../models/user";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class SignalrService {
  private baseUrl = environment.apiUrl + "chathub";
  private hubConnection: signalR.HubConnection;

  public currentRoomId: string;
  private currentRoomMessages = new ReplaySubject<Message>(1);
  public currentRoomMessages$ = this.currentRoomMessages.asObservable();

  constructor(private userService: UserService) {}

  public createConnection(): void {
    const jwtToken = localStorage.getItem("jwtToken");
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl, {
        accessTokenFactory: () => jwtToken,
      })
      // .withAutomaticReconnect()
      .build();
    this.startConnection();
  }

  public disposeConnection(): void {
    this.hubConnection.stop();
  }

  public changeRoom(roomId: string) {
    this.currentRoomMessages.next(null);
    this.currentRoomId = roomId;
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
        this.receiveMessage();
        this.statusMessage();
        this.connectAllRoom();
      })
      .catch((err) => {
        console.log("Error while starting connection: " + err);
      });
  }

  public sendMessage(roomId: string, message: string): void {
    this.hubConnection
      .send("SendMessage", roomId, message)
      .catch((err) => console.log(err));
  }

  private receiveMessage(): void {
    this.hubConnection.on("ReceiveMessage", (message: Message) => {
      if (this.currentRoomId && this.currentRoomId === message.roomId) {
        this.currentRoomMessages?.next(message);
      }
    });
  }

  private statusMessage(): void {
    this.hubConnection.on("StatusMessage", (status) => {
      console.log(status);
    });
  }

  private connectAllRoom() {
    this.userService.currentUser$
      .pipe(
        map((user: User) => {
          user.friends.forEach((friend: Friend) => {
            this.connectToRoom(friend.roomId);
          });
        })
      )
      .subscribe();
  }

  private connectToRoom(roomId: string) {
    this.hubConnection
      .send("ConnectToRoom", roomId)
      .catch((err) => console.log(err));
  }


}

import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "projects/shell/src/environments/environment";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { Message } from "../models/message";

@Injectable()
export class SignalrService {
  private baseUrl = environment.apiUrl + "chathub";
  private hubConnection: signalR.HubConnection;

  public currentRoomId: string;
  private currentRoomMessages = new ReplaySubject<Message>(1);
  public currentRoomMessages$ = this.currentRoomMessages.asObservable();

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

  public sendMessage(roomId: string, message: string): void {
    this.hubConnection
      .send("SendMessage", roomId, message)
      .catch((err) => console.log(err));
  }

  public changeRoom(roomId: string) {
    this.currentRoomMessages.next(null);
    this.currentRoomId = roomId;
    this.connectToRoom(this.currentRoomId);
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
        this.receiveMessage();
      })
      .catch((err) => {
        console.log("Error while starting connection: " + err);
      });
  }

  private receiveMessage(): void {
    this.hubConnection.on("ReceiveMessage", (message: Message) => {
      if (this.currentRoomId && this.currentRoomId === message.roomId) {
        this.currentRoomMessages?.next(message);
      }
    });
  }
  
  private connectToRoom(roomId: string) {
    this.hubConnection
      .send("ConnectToRoom", roomId)
      .catch((err) => console.log(err));
  }
}

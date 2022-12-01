import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";

@Injectable()
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private token: string;

  public startConnection(jwtToken: string) {
    this.token = jwtToken;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:57874/chatHub", {
        accessTokenFactory: () => this.token,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log("Error while starting connection: " + err));
    this.hubConnection.on("ReceiveMessage", (user, message) => {
      console.log("User: " + user);
      console.log("Message: " + message);
    });
  }

  public sendMessage(roomId: string, message: string) {
    this.hubConnection
      .send("SendMessage", roomId, message)
      .catch((err) => console.log(err));
  }
}

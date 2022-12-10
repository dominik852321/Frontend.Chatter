import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/shell/src/environments/environment';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Message, Room } from '../models/message';

@Injectable()
export class ChatService {

  private baseUrl = environment.apiUrl + "chat/";
  
  constructor(private http: HttpClient) { }

  public getMessages(roomId: string, page: number = 1): Observable<Message[]> {
    const params = new HttpParams().set("roomId", roomId).set("page", page);
    return this.http.get<Message[]>(this.baseUrl + "getMessages", { params }).pipe(
      map((message: Message[]) => {
        if (message) {
          return message;
        }
        return null;
      })
    );
  }

  public getRoom(roomId: string): Observable<Room> {
    const params = new HttpParams().set("roomId", roomId);
    return this.http.get<Room>(this.baseUrl + "getRoom", { params }).pipe(
      map((room: Room) => {
        if (room) {
          return room;
        }
        return null;
      })
    );
  }
}
















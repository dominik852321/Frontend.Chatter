import { Friend } from "./user";

export class Message {
  id: string;
  roomId: string;
  senderId: string;
  created: string;
  value: string;
}

export class StatusChange {
  status: number;
  userId: string;
}

export class Room {
  id: string;
  name: string;
  users: Array<Friend>;
}

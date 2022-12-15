export class User {
  id: string;
  userName: string;
  email: string;
  status: number;
  friends: Array<Friend>;
  friendRequests: Array<FriendRequest>;
  profilePictureUrl: string;
}

export class Friend {
  id: string;
  userName: string;
  roomId: string;
  status: number;
  profilePictureUrl: string;
}

export class FriendRequest {
  id: string;
  senderId: string;
  senderUsername: string;
  senderProfilePictureUrl: string;
  recipientId: string;
  isAccepted: boolean;
  dateTime: string;
}
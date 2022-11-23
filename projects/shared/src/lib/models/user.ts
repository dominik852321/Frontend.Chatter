export class User {
  id: string;
  userName: string;
  email: string;
  status: number;
  friends: Array<Friend>;
  friendRequests: Array<FriendRequest>;
}

export class Friend {
  id: string;
  userName: string;
  roomId: string;
  status: number;
}

export class FriendRequest {
  id: string
  senderId: string
  recipientId: string
  isAccepted: boolean
  dateTime: string
}


export class UserProfile {
  id: string;
  photoUrl: string;
  userName: string;
  email: string;
  profession: string;
  education: string;
  location: string;
  skills: string;
  notes: string;
}

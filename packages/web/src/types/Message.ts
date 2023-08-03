export interface Message {
  senderId?: string;
  recieverId: string;
  _id: string;
  chat: {
    text?: string | null;
    image?: string;
  };
}

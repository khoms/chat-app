export interface Message {
  senderId?: string;
  recieverId: string;
  _id: string;
  message: {
    text?: string | null;
    image?: string;
  };
  status?: "unseen" | "seen";
}

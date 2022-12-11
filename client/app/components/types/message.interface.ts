export interface IMessage {
  messageId?: string;
  roomId: string;
  senderId: number | undefined;
  senderAvatar?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

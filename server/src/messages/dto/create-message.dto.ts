export class CreateMessageDto {
	id?: number
	roomId: string
	senderId: number
	senderAvatar: string
	message: string
	sentAt?: Date
	updatedAt?: Date
}

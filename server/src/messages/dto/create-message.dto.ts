export class CreateMessageDto {
	id?: number
	dialogId: number
	senderId: number
	senderAvatar: string
	message: string
	sentAt?: Date
	updatedAt?: Date
}

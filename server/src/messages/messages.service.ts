import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DialogEntity } from '../dialog/entities/dialog.entity'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessageEntity } from './entities/message.entity'

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(MessageEntity)
		private readonly messageRepository: Repository<MessageEntity>,
		@InjectRepository(DialogEntity)
		private readonly dialogRepository: Repository<DialogEntity>
	) {}

	async getConversation(roomId: string) {
		return await this.messageRepository.find({
			where: {
				roomId
			},
			relations: {
				user: true
			},
			order: { createdAt: 'ASC' }
		})
	}

	async sendMessage(createMessageDto: CreateMessageDto) {
		const newMessage = await this.messageRepository.create({
			...createMessageDto,
			user: { id: createMessageDto.userId }
		})
		await this.messageRepository.save(newMessage)

		return await this.messageRepository.findOne({
			where: { id: newMessage.id },
			relations: { user: true }
		})
	}

	// async deleteMessage(deleteMessageDto: Partial<CreateMessageDto>) {}
	// async activateTyping(createMessageDto: CreateMessageDto) {}
	// async deactivateTyping(createMessageDto: CreateMessageDto) {}
	//async leaveDialog(roomId: string) {}
}

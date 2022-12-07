import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { v4 as generateId } from 'uuid'
import { CreateMessageDto } from './dto/create-message.dto'

@Injectable()
export class MessagesService {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	getServerDate() {
		return {
			createdAt: Date.now(),
			updatedAt: Date.now()
		}
	}
	async getConversation(dialogId: number) {
		const history = await this.redis.hget('messages', dialogId.toString())
		return JSON.parse(history)
	}

	async sendMessage(createMessageDto: CreateMessageDto) {
		const serverDate = this.getServerDate()
		const messageId = generateId().toString()
		const message = { ...createMessageDto, ...serverDate }
		// await this.redis.hset('messages', messageId, JSON.stringify(message))
		await this.redis.publish('dialog', JSON.stringify(message))
		return message
	}
	async deleteMessage(deleteMessageDto: Partial<CreateMessageDto>) {}
	async activateTyping(createMessageDto: CreateMessageDto) {}
	async deactivateTyping(createMessageDto: CreateMessageDto) {}
	async joinDialog(dialogId: number) {}
	async leaveDialog(dialogId: number) {}
}

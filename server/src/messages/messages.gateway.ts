import { Logger } from '@nestjs/common'
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessagesService } from './messages.service'

@WebSocketGateway(3002, { cors: true })
export class MessagesGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private readonly messageService: MessagesService) {}

	/*

	We use:
	 - Server for emit to all connected sockets
	 - Socket for emit all connected sockets but sender

	*/
	@WebSocketServer() wss: Server
	client: Socket

	handleConnection(client: any, ...args: any[]): any {
		Logger.log(`client-${client.id} connected`)
	}

	handleDisconnect(client: any): any {
		Logger.log(`client-${client.id} disconnected`)
	}

	@SubscribeMessage('dialog:request-history')
	async getConversation(@MessageBody('dialogId') dialogId: number) {
		const history = await this.messageService.getConversation(dialogId)
		this.client.to(dialogId.toString()).emit('dialog:get-history', history)
	}
	@SubscribeMessage('message:send')
	async sendMessage(
		client: Socket,
		@MessageBody() createMessageDto: CreateMessageDto
	) {
		const message = await this.messageService.sendMessage(createMessageDto)
		Logger.log(message.dialogId.toString())
		this.wss
			.to(createMessageDto.dialogId.toString())
			.emit('message:get', message)
	}

	@SubscribeMessage('message:delete')
	async deleteMessage(
		@MessageBody() deleteMessageDto: Partial<CreateMessageDto>
	) {
		const message = await this.messageService.deleteMessage(deleteMessageDto)
	}

	@SubscribeMessage('message:typing:active')
	async activateTyping(@MessageBody() typingState: boolean) {}

	@SubscribeMessage('dialog:join')
	async joinDialog(dialogId: number) {
		this.client.join(dialogId.toString())
		this.client.emit('dialog:joined', dialogId)
	}

	@SubscribeMessage('dialog:leave')
	async leaveDialog(dialogId: number) {
		this.client.leave(dialogId.toString())
		this.client.emit('dialog:left', dialogId)
	}
}

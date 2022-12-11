import { Logger } from '@nestjs/common'
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessagesService } from './messages.service'

@WebSocketGateway({
	cors: { origin: 'http://localhost:3000' },
	serveClient: false,
	namespace: 'chat',
	transports: ['websocket']
})
export class MessagesGateway {
	constructor(private readonly messageService: MessagesService) {}

	/*

	We use:
	 - Server for emit to all connected sockets
	 - Socket for emit all connected sockets but sender

	*/
	@WebSocketServer() wss: Server

	@SubscribeMessage('dialog:join')
	async joinDialog(
		@ConnectedSocket() client: Socket,
		@MessageBody('roomId') roomId: string
	) {
		client.join(roomId)
		Logger.log(client.id + ' ' + roomId)
		client.to(roomId).emit('dialog:joined', roomId)
	}

	@SubscribeMessage('dialog:leave')
	async leaveDialog(
		@ConnectedSocket() client: Socket,
		@MessageBody('roomId') roomId: string
	) {
		client.leave(roomId)
		client.to(roomId).emit('dialog:left', roomId)
	}

	@SubscribeMessage('message:send')
	async sendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
		const message = await this.messageService.sendMessage(createMessageDto)
		this.wss.to(createMessageDto.roomId).emit('message:get', message)
	}

	@SubscribeMessage('dialog:request-history')
	async getConversation(
		@ConnectedSocket() client: Socket,
		@MessageBody('roomId') roomId: string
	) {
		const history = await this.messageService.getConversation(roomId)
		this.wss.emit('dialog:get-history', history)
	}

	@SubscribeMessage('message:delete')
	async deleteMessage(
		@ConnectedSocket() client: Socket,
		@MessageBody() deleteMessageDto: Partial<CreateMessageDto>
	) {
		const message = await this.messageService.deleteMessage(deleteMessageDto)
	}

	// @SubscribeMessage('message:typing:active')
	// async activateTyping(
	// 	@ConnectedSocket() client: Socket,
	// 	@MessageBody() typingState: boolean
	// ) {}
}

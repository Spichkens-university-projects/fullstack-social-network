import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { RelationshipService } from './relationship.service'

@Controller('relationship')
export class RelationshipController {
	constructor(private readonly relationshipService: RelationshipService) {}

	@Get('friends')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getFriends(@CurrentUser('id') userId: number) {
		return await this.relationshipService.getFriends(userId)
	}

	@Get('subscribers')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getSubscribers(@CurrentUser('id') userId: number) {
		return await this.relationshipService.getSubscribers(userId)
	}

	@Get('subscribes')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getSubscribes(@CurrentUser('id') userId: number) {
		return await this.relationshipService.getSubscribes(userId)
	}

	@Post('send-request/:toUserId')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async sendRequest(
		@CurrentUser('id') fromUserId: number,
		@Param('toUserId') toUserId: number
	) {
		return await this.relationshipService.sendRequest(fromUserId, toUserId)
	}

	@Post('accept-request/:fromUserId')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async acceptRequest(
		@CurrentUser('id') toUserId: number,
		@Param('toUserId') fromUserId: number
	) {
		return await this.relationshipService.acceptRequest(toUserId, fromUserId)
	}

	@Post('reject-request/:fromUserId')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async rejectRequest(
		@CurrentUser('id') toUserId: number,
		@Param('toUserId') fromUserId: number
	) {
		return await this.relationshipService.rejectRequest(toUserId, fromUserId)
	}
}

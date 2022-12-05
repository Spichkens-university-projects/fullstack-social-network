import { Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { LikeService } from './like.service'

@Controller('like')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@Post()
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async likePost(
		@CurrentUser('id') userId: number,
		@Query('postId') postId: number
	) {
		return await this.likeService.likePost(userId, postId)
	}
}

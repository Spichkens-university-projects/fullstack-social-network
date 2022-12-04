import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get('current')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getCurrentUserPosts(@CurrentUser('id') userId: number) {
		return this.postService.getCurrentUserPosts(userId)
	}

	@Get('related')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getFriendsPosts(@CurrentUser('id') userId: number) {
		return this.postService.getFriendsPosts(userId)
	}
}

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get('my')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getCurrentUserPosts(@CurrentUser('id') userId: number) {
		return await this.postService.getCurrentUserPosts(userId)
	}

	@Get('related')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getRelatedPosts(@CurrentUser('id') userId: number) {
		return await this.postService.getRelatedPosts(userId)
	}

	@Delete('delete/:postId')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async removePost(@Param('postId') postId: number) {
		return await this.postService.removePost(postId)
	}

	@Patch('update/:postId')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async updatePost(
		@Param('postId') postId: number,
		@Body() dto: UpdatePostDto
	) {
		return await this.postService.updatePost(postId, dto)
	}

	@Post('create')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async createPost(@Body() dto: CreatePostDto) {
		return await this.postService.createPost(dto)
	}
}

import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ReplyCommentDto } from './dto/reply-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post('reply')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async replyComment(
		@CurrentUser('id') userId: number,
		@Query('commentatorId') commentatorId: number,
		@Query('parentId') parentId: number,
		@Body() dto: ReplyCommentDto
	) {
		return await this.commentService.replyComment(
			userId,
			commentatorId,
			parentId,
			dto
		)
	}

	@Post('create')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async createComment(
		@CurrentUser('id') userId: number,
		@Body() dto: CreateCommentDto
	) {
		return await this.commentService.createComment(userId, dto)
	}

	@Patch('update')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async updateComment(
		@CurrentUser('id') userId: number,
		@Query('commentId') commentId: number,
		@Body() dto: UpdateCommentDto
	) {
		return await this.commentService.updateComment(userId, commentId, dto)
	}

	@Delete('delete')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async deleteComment(
		@CurrentUser('id') userId: number,
		@Query('commentId') commentId: number
	) {
		return await this.commentService.deleteComment(userId, commentId)
	}
}

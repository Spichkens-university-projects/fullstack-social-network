import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostEntity } from '../post/entities/post.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ReplyCommentDto } from './dto/reply-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { CommentEntity } from './entities/comment.entity'
import { ReplyEntity } from './entities/reply.entity'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>,
		@InjectRepository(ReplyEntity)
		private readonly replyRepository: Repository<ReplyEntity>,
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {}

	async replyComment(
		userId: number,
		commentatorId: number,
		parentId: number,
		dto: ReplyCommentDto
	): Promise<ReplyEntity & { postId: number }> {
		const comment = await this.checkIfCommentExists(commentatorId, parentId)

		const reply = await this.replyRepository.create({
			parent: { id: parentId },
			user: { id: userId },
			replyBody: dto.commentBody
		})

		return {
			...(await this.replyRepository.save(reply)),
			postId: comment.post.id
		}
	}

	async createComment(
		userId: number,
		dto: CreateCommentDto
	): Promise<CommentEntity> {
		await this.checkIfPostExists(dto.postId)

		const newComment = await this.commentRepository.create({
			post: { id: dto.postId },
			user: { id: userId },
			commentBody: dto.commentBody
		})

		return await this.commentRepository.save(newComment)
	}

	async updateComment(
		userId: number,
		commentId: number,
		dto: UpdateCommentDto
	): Promise<boolean> {
		await this.checkIfCommentExists(userId, commentId)
		await this.commentRepository.update({ id: commentId }, { ...dto })

		return true
	}

	async deleteComment(
		userId: number,
		commentId: number
	): Promise<CommentEntity> {
		const comment = await this.checkIfCommentExists(userId, commentId)
		Logger.log(JSON.stringify(comment))
		return await this.commentRepository.remove(comment)
	}

	async checkIfPostExists(postId: number): Promise<boolean> {
		const isPostExists = await this.postRepository.findOne({
			where: { id: postId }
		})
		if (!isPostExists) throw new NotFoundException('Такого поста не существует')
		return true
	}

	async checkIfCommentExists(
		userId: number,
		commentId: number
	): Promise<CommentEntity> {
		const isCommentExists = await this.commentRepository.findOne({
			where: { id: commentId, user: { id: userId } },
			relations: { post: true }
		})
		if (!isCommentExists)
			throw new NotFoundException('Такого комментария не существует')

		return isCommentExists
	}
}

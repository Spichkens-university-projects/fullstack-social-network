import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { RelationshipService } from '../relationship/relationship.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		private readonly relationshipService: RelationshipService
	) {}

	async getCurrentUserPosts(userId: number): Promise<PostEntity[]> {
		return await this.postRepository.find({
			where: {
				id: userId
			},
			relations: {
				user: true,
				likes: true,
				comments: true
			},
			order: {
				createdAt: 'DESC'
			}
		})
	}

	async getRelatedPosts(userId: number): Promise<PostEntity[]> {
		const relatedIds: number[] = []

		await this.relationshipService
			.getFriends(userId)
			.then(friends =>
				friends.map(friend => relatedIds.push(friend.fromUser.id))
			)

		await this.relationshipService
			.getSubscribes(userId)
			.then(subscribes =>
				subscribes.map(subscribe => relatedIds.push(subscribe.toUser.id))
			)

		return await this.postRepository.find({
			where: {
				user: {
					id: In(relatedIds)
				}
			}
		})
	}

	async removePost(postId: number): Promise<boolean> {
		const isRemoved = await this.postRepository.delete({ id: postId })

		if (!isRemoved)
			throw new InternalServerErrorException('Ошибка удаления публикации')

		return true
	}

	async updatePost(postId: number, dto: UpdatePostDto): Promise<boolean> {
		const postToUpdate = await this.postRepository.find({
			where: { id: postId }
		})

		const isUpdated = await this.postRepository.update(
			{ ...dto },
			{ id: postId }
		)

		if (!isUpdated)
			throw new InternalServerErrorException('Ошибка обновления публикации')

		return true
	}

	async createPost(dto: CreatePostDto): Promise<PostEntity> {
		const newPost = await this.postRepository.create({
			user: { id: dto.userId },
			mediaPath: dto.mediaPath,
			description: dto.description
		})

		return this.postRepository.save(newPost)
	}
}

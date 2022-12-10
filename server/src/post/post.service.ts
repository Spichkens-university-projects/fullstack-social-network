import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsRelations, In, Repository } from 'typeorm'
import { MediaService } from '../media/media.service'
import { RelationshipService } from '../relationship/relationship.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		private readonly relationshipService: RelationshipService,
		private readonly mediaService: MediaService
	) {}

	selectConfig = {
		user: true,
		likes: {
			user: true
		},
		comments: {
			user: true,
			replies: {
				user: true
			}
		}
	} as FindOptionsRelations<PostEntity>

	async getPostById(postId: number): Promise<PostEntity> {
		return await this.postRepository.findOne({
			where: { id: postId },
			relations: this.selectConfig
		})
	}

	async getUserPosts(userId: number): Promise<PostEntity[]> {
		return await this.postRepository.find({
			where: {
				user: {
					id: userId
				}
			},
			relations: this.selectConfig,
			order: {
				createdAt: 'DESC'
			}
		})
	}

	async getRelatedPosts(userId: number): Promise<PostEntity[]> {
		const relatedIds: number[] = []

		await this.relationshipService
			.getFriends(userId)
			.then(relations =>
				relations.map(relation => relatedIds.push(relation.fromUser.id))
			)

		await this.relationshipService
			.getSubscribes(userId)
			.then(relations =>
				relations.map(relation => relatedIds.push(relation.toUser.id))
			)

		return await this.postRepository.find({
			where: {
				user: In(relatedIds)
			},
			relations: this.selectConfig,
			order: {
				createdAt: 'DESC'
			}
		})
	}

	async removePost(postId: number): Promise<boolean> {
		Logger.log(postId)
		const isExist = await this.postRepository.findOne({
			where: {
				id: postId
			}
		})

		if (!isExist)
			throw new NotFoundException('Попытка удаления несуществующего поста')

		const isRemoved = await this.postRepository.remove(isExist)

		if (!isRemoved)
			throw new InternalServerErrorException('Ошибка удаления публикации')

		return true
	}

	async updatePost(postId: number, dto: UpdatePostDto): Promise<boolean> {
		const isExist = await this.postRepository.findOne({
			where: {
				id: postId
			}
		})
		if (!isExist)
			throw new NotFoundException('Попытка обновления несуществующего поста')

		const isUpdated = await this.postRepository.update(
			{ id: postId },
			{ ...dto }
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

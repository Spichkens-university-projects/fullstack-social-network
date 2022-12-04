import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		private readonly userService: UserService
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

	async getFriendsPosts(userId: number): Promise<PostEntity[]> {
		const friendsIds = await
		return await this.postRepository.find({})
	}
}

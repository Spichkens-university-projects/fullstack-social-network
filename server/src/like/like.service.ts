import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LikeEntity } from './entities/like.entity'

@Injectable()
export class LikeService {
	constructor(
		@InjectRepository(LikeEntity)
		private readonly likeRepository: Repository<LikeEntity>
	) {}

	async likePost(userId: number, postId: number): Promise<boolean> {
		const isExist = await this.likeRepository.findOne({
			where: {
				post: { id: postId },
				user: { id: userId }
			}
		})

		if (isExist) {
			await this.likeRepository.remove(isExist)
			return false
		}

		const newLike = await this.likeRepository.create({
			post: { id: postId },
			user: { id: userId }
		})

		await this.likeRepository.save(newLike)
		return true
	}
}

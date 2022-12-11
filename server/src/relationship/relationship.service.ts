import {
	BadRequestException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import {
	DecisionType,
	RelationshipEntity
} from './entities/relationship.entity'

@Injectable()
export class RelationshipService {
	constructor(
		@InjectRepository(RelationshipEntity)
		private readonly relationshipRepository: Repository<RelationshipEntity>
	) {}

	async getFriends(userId: number): Promise<RelationshipEntity[]> {
		return await this.relationshipRepository.find({
			where: {
				toUser: { id: userId },
				decision: DecisionType.accepted
			},
			relations: {
				fromUser: true
			}
		})
	}

	async getSubscribes(userId: number): Promise<RelationshipEntity[]> {
		return await this.relationshipRepository.find({
			where: { fromUser: { id: userId }, decision: IsNull() },
			relations: {
				toUser: true
			}
		})
	}

	async getSubscribers(userId: number): Promise<RelationshipEntity[]> {
		return await this.relationshipRepository.find({
			where: { toUser: { id: userId }, decision: IsNull() },
			relations: {
				fromUser: true
			}
		})
	}

	async sendRequest(currentUserId: number, toUserId: number): Promise<boolean> {
		const isExist = await this.relationshipRepository.findOne({
			where: {
				fromUser: { id: currentUserId },
				toUser: { id: toUserId }
			}
		})
		if (isExist) throw new BadRequestException('Запрос уже отправлен')

		const newRelation = await this.relationshipRepository.create({
			fromUser: { id: currentUserId },
			toUser: { id: toUserId }
		})

		if (!newRelation)
			throw new InternalServerErrorException('Ошибка отправки запроса')

		await this.relationshipRepository.save(newRelation)

		return true
	}

	async cancelRequest(
		currentUserId: number,
		toUserId: number
	): Promise<boolean> {
		const isExist = await this.relationshipRepository.findOne({
			where: {
				fromUser: { id: currentUserId },
				toUser: { id: toUserId }
			}
		})
		if (!isExist) throw new BadRequestException('Запроса не существует')
		await this.relationshipRepository.remove(isExist)
		return true
	}

	async acceptRequest(currentUserId, fromUserId): Promise<boolean> {
		const isExist = await this.relationshipRepository.findOne({
			where: {
				fromUser: { id: fromUserId },
				toUser: { id: currentUserId },
				decision: IsNull()
			}
		})

		if (!isExist)
			throw new BadRequestException(
				'Запроса не существует или решение уже принято'
			)

		const isUpdated = await this.relationshipRepository.update(isExist.id, {
			decision: DecisionType.accepted
		})

		if (!isUpdated)
			throw new InternalServerErrorException('Ошибка ответа на запрос')

		const symmetricRecord = await this.relationshipRepository.create({
			fromUser: { id: currentUserId },
			toUser: { id: fromUserId },
			decision: DecisionType.accepted
		})

		await this.relationshipRepository.save(symmetricRecord)

		return true
	}

	async rejectRequest(currentUserId, fromUserId): Promise<boolean> {
		const isExist = await this.relationshipRepository.findOne({
			where: {
				fromUser: { id: fromUserId },
				toUser: { id: currentUserId },
				decision: IsNull()
			}
		})

		if (!isExist)
			throw new BadRequestException(
				'Запроса не существует или решение уже принято'
			)

		await this.relationshipRepository.remove(isExist)

		return true
	}

	async removeFriend(currentUserId, fromUserId): Promise<boolean> {
		const removedFriend = await this.relationshipRepository.delete({
			fromUser: { id: currentUserId },
			toUser: { id: fromUserId },
			decision: DecisionType.accepted
		})

		if (!removedFriend)
			throw new BadRequestException('Попытка удаления несуществуещей связи')

		// Вместо полного удаления оставляем друга в подписчках
		await this.relationshipRepository.update(
			{ fromUser: { id: fromUserId }, toUser: { id: currentUserId } },
			{ decision: null }
		)

		return true
	}
}

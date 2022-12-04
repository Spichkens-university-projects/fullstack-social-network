import {
	BadRequestException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
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
				fromUser: { id: userId },
				decision: DecisionType.accepted
			}
		})
	}

	async getSubscribes(userId: number): Promise<RelationshipEntity[]> {
		return await this.relationshipRepository.find({
			where: [
				{ fromUser: { id: userId }, decision: Not(DecisionType.accepted) },
				{ fromUser: { id: userId }, decision: Not(DecisionType.canceled) }
			]
		})
	}

	async getSubscribers(userId: number): Promise<RelationshipEntity[]> {
		return await this.relationshipRepository.find({
			where: [
				{ toUser: { id: userId }, decision: Not(DecisionType.accepted) },
				{ toUser: { id: userId }, decision: Not(DecisionType.canceled) }
			]
		})
	}

	async sendRequest(fromUserId: number, toUserId: number): Promise<boolean> {
		const isExist = await this.relationshipRepository.find({
			where: {
				fromUser: { id: fromUserId },
				toUser: { id: toUserId }
			}
		})
		if (isExist) throw new BadRequestException('Запрос уже отправлен')

		const isSent = await this.relationshipRepository.create({
			fromUser: { id: fromUserId },
			toUser: { id: toUserId }
		})

		if (!isSent)
			throw new InternalServerErrorException('Ошибка отправки запроса')

		return true
	}

	async acceptRequest(toUserId, fromUserId): Promise<boolean> {
		const isExist = await this.relationshipRepository.find({
			where: [
				{
					fromUser: { id: fromUserId },
					toUser: { id: toUserId },
					decision: Not(DecisionType.accepted)
				},
				{
					fromUser: { id: fromUserId },
					toUser: { id: toUserId },
					decision: Not(DecisionType.canceled)
				}
			]
		})

		if (!isExist)
			throw new BadRequestException(
				'Запроса не существует или решение уже принято'
			)

		const isSent = await this.relationshipRepository.update(
			{ decision: DecisionType.accepted },
			{ fromUser: { id: fromUserId }, toUser: { id: toUserId } }
		)

		if (!isSent)
			throw new InternalServerErrorException('Ошибка ответа на запрос')

		return true
	}

	async rejectRequest(toUserId, fromUserId): Promise<boolean> {
		const isExist = await this.relationshipRepository.find({
			where: [
				{
					fromUser: { id: fromUserId },
					toUser: { id: toUserId },
					decision: Not(DecisionType.accepted)
				},
				{
					fromUser: { id: fromUserId },
					toUser: { id: toUserId },
					decision: Not(DecisionType.canceled)
				}
			]
		})

		if (!isExist)
			throw new BadRequestException(
				'Запроса не существует или решение уже принято'
			)

		const isSent = await this.relationshipRepository.update(
			{ decision: DecisionType.canceled },
			{ fromUser: { id: fromUserId }, toUser: { id: toUserId } }
		)

		if (!isSent)
			throw new InternalServerErrorException('Ошибка отказа на запрос')

		return true
	}
}

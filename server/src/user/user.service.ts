import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	FindOptionsSelect,
	FindOptionsWhereProperty,
	ILike,
	In,
	Not,
	Repository
} from 'typeorm'
import { RelationshipService } from '../relationship/relationship.service'

import { UserEntity } from './entities/user.entity'

const selectConfig = [
	'id',
	'name',
	'surname',
	'avatarPath',
	'createdAt',
	'updatedAt',
	'status',
	'nickname'
] as FindOptionsSelect<UserEntity>

@Injectable()
export class UserService {
	constructor(
		private relationshipService: RelationshipService,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async getUserById(userId: number) {
		return await this.userRepository.findOne({
			where: {
				id: userId
			},
			select: selectConfig
		})
	}

	async getAllUsers() {
		return await this.userRepository.find({ select: selectConfig })
	}

	async getAllUnknownUsers(userId: number, searchTerm: string) {
		const excludedIds: number[] = []

		await this.relationshipService
			.getFriends(userId)
			.then(relations =>
				relations.map(relation => excludedIds.push(relation.fromUser.id))
			)

		excludedIds.push(userId)
		const notFriends = Not(In(excludedIds))

		let options: FindOptionsWhereProperty<UserEntity> = {}
		if (searchTerm) {
			const term = ILike(`%${searchTerm}%`)
			options = [
				{ name: term, id: notFriends },
				{ surname: term, id: notFriends },
				{ nickname: term, id: notFriends }
			]
		} else {
			options = { id: notFriends }
		}

		return await this.userRepository.find({
			where: options,
			select: selectConfig
		})
	}
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
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
		return await this.userRepository.find({
			select: selectConfig
		})
	}
}

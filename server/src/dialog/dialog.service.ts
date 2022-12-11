import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { DialogEntity } from './entities/dialog.entity'

@Injectable()
export class DialogService {
	constructor(
		@InjectRepository(DialogEntity)
		private readonly dialogRepository: Repository<DialogEntity>
	) {}

	async getDialogByRoomId(userId: number, roomId: string) {
		return await this.dialogRepository.findOne({
			where: { roomId, user: { id: userId } },
			relations: {
				withUser: true
			}
		})
	}

	async createDialog(
		userId: number,
		withUserId: number
	): Promise<DialogEntity> {
		const isExist = await this.dialogRepository.findOne({
			where: [
				{ user: { id: userId }, withUser: { id: withUserId } },
				{ user: { id: withUserId }, withUser: { id: userId } }
			]
		})
		if (isExist) return isExist

		// Для сокетов
		const roomId = uuidv4()

		// Создани диалога у другого пользователя
		const symmetricalDialog = await this.dialogRepository.create({
			user: { id: withUserId },
			withUser: { id: userId },
			roomId
		})
		await this.dialogRepository.save(symmetricalDialog)

		// СОздание диалога у текущего пользователя
		const newDialog = await this.dialogRepository.create({
			user: { id: userId },
			withUser: { id: withUserId },
			roomId
		})
		return await this.dialogRepository.save(newDialog)
	}

	async getUserDialogs(userId: number, searchTerm): Promise<DialogEntity[]> {
		let options: FindOptionsWhereProperty<DialogEntity> = {}
		if (searchTerm) {
			const term = ILike(`%${searchTerm}%`)
			options = [
				{ user: { id: userId }, withUser: { name: term } },
				{ user: { id: userId }, withUser: { surname: term } },
				{ user: { id: userId }, withUser: { nickname: term } }
			]
		} else {
			options = { user: { id: userId } }
		}

		const dialogs = await this.dialogRepository.find({
			where: options,
			relations: {
				withUser: true,
				user: true
			}
		})
		return dialogs
	}
	async deleteDialog(roomId: string): Promise<boolean> {
		const dialogs = await this.dialogRepository.delete({
			roomId: roomId
		})
		if (!dialogs) throw new NotFoundException('Диалог не найден')

		return true
	}
}

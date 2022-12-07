import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DialogEntity } from './entities/dialog.entity'

@Injectable()
export class DialogService {
	constructor(
		@InjectRepository(DialogEntity)
		private readonly dialogRepository: Repository<DialogEntity>
	) {}
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
		if (isExist) throw new BadRequestException('Такой диалог уже существует')

		const newDialog = await this.dialogRepository.create({
			user: { id: userId },
			withUser: { id: withUserId }
		})
		return await this.dialogRepository.save(newDialog)
	}
	async getUserDialogs(userId: number): Promise<DialogEntity[]> {
		const dialogs = await this.dialogRepository.find({
			where: [{ user: { id: userId } }, { withUser: { id: userId } }],
			relations: {
				user: true,
				withUser: true
			}
		})
		return dialogs
	}
	async deleteDialog(dialogId: number): Promise<boolean> {
		const dialog = await this.dialogRepository.findOne({
			where: { id: dialogId }
		})
		if (!dialog) throw new NotFoundException('Диалог не найден')
		await this.dialogRepository.remove(dialog)
		return true
	}
}

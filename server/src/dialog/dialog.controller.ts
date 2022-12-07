import {
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query
} from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { DialogService } from './dialog.service'

@Controller('dialog')
export class DialogController {
	constructor(private readonly dialogService: DialogService) {}
	@Post('create')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	createDialog(
		@CurrentUser('id') userId: number,
		@Query('with') withUserId: number
	) {
		return this.dialogService.createDialog(userId, withUserId)
	}

	@Get('all')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	getUserDialogs(@CurrentUser('id') userId: number) {
		return this.dialogService.getUserDialogs(userId)
	}

	@Delete('delete')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	deleteDialog(@Query('dialogId') dialogId: number) {
		return this.dialogService.deleteDialog(dialogId)
	}
}

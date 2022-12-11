import {
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
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
	@HttpCode(HttpStatus.OK)
	getUserDialogs(
		@CurrentUser('id') userId: number,
		@Query('searchTerm') searchTerm?: string
	) {
		return this.dialogService.getUserDialogs(userId, searchTerm)
	}

	@Get('byRoomId/:roomId')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	getDialogByRoomId(
		@CurrentUser('id') userId: number,
		@Param('roomId') roomId: string
	) {
		return this.dialogService.getDialogByRoomId(userId, roomId)
	}

	@Delete('delete')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	deleteDialog(@Query('roomId') roomId: string) {
		return this.dialogService.deleteDialog(roomId)
	}
}

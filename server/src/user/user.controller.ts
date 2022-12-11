import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Query
} from '@nestjs/common'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('byId/:id')
	@HttpCode(HttpStatus.OK)
	async getUserById(@Param('id') userId: number) {
		return await this.userService.getUserById(userId)
	}

	@Get('all')
	@HttpCode(HttpStatus.OK)
	async getAllUsers() {
		return await this.userService.getAllUsers()
	}

	@Get('unknown')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	async getAllUnknownUsers(
		@CurrentUser('id') userId: number,
		@Query('searchTerm') searchTerm?: string
	) {
		return await this.userService.getAllUnknownUsers(userId, searchTerm)
	}
}

import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	async getUserById(@Param('id') userId: number) {
		return await this.userService.getUserById(userId)
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllUsers() {
		return await this.userService.getAllUsers()
	}
}

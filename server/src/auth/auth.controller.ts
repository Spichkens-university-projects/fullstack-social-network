import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { LoginResponseType } from './types/login-response.type'
import { RegisterResponseType } from './types/register-response.type'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto): Promise<LoginResponseType> {
		return this.authService.login(dto)
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async register(@Body() dto: RegisterDto): Promise<RegisterResponseType> {
		return this.authService.register(dto)
	}

	@Get('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(@Req() request): Promise<LoginResponseType> {
		return this.authService.refresh(request.cookies['refresh'])
	}
}

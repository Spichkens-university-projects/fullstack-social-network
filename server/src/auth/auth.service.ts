import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { CredentialsEntity } from './entities/credentials.entity'
import { JwtPayloadType } from './types/jwt-payload.type'
import { LoginResponseType } from './types/login-response.type'
import { RegisterResponseType } from './types/register-response.type'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(CredentialsEntity)
		private readonly credentialsRepository: Repository<CredentialsEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async refresh(rt: string): Promise<LoginResponseType> {
		if (!rt) throw new UnauthorizedException('Пользователь не авторизирован')

		const jwtPayload: JwtPayloadType = await this.jwtService.verifyAsync(rt, {
			secret: this.configService.get('REFRESH_SECRET')
		})

		const [accessToken, refreshToken] = await this.createTokens(jwtPayload.id)

		return {
			user: jwtPayload,
			accessToken,
			refreshToken
		}
	}

	async login(dto: LoginDto): Promise<LoginResponseType> {
		const validated = await this.validateUser(dto)

		const [accessToken, refreshToken] = await this.createTokens(
			validated.user.id
		)

		return {
			user: this.returnUserFields(validated),
			accessToken,
			refreshToken
		}
	}

	async register(dto: RegisterDto): Promise<RegisterResponseType> {
		const isExist = await this.credentialsRepository.findOneBy({
			email: dto.email
		})

		if (isExist)
			throw new BadRequestException('Пользователь с таким email уже существует')

		// create user credentials
		const salt = await genSalt(5)
		const newCredentials = await this.credentialsRepository.create({
			email: dto.email,
			password: await hash(dto.password, salt)
		})
		const credentials = await this.credentialsRepository.save(newCredentials)

		// create new user
		const newUser = await this.userRepository.create({
			name: dto.name,
			surname: dto.surname,
			credentials
		})
		await this.userRepository.save(newUser)

		return {
			user: this.returnUserFields(credentials)
		}
	}

	async validateUser(dto: LoginDto): Promise<CredentialsEntity> {
		const response = await this.credentialsRepository.findOne({
			where: {
				email: dto.email
			},
			relations: {
				user: true
			}
		})

		if (!response)
			throw new NotFoundException('Пользователь с таким email не найден')

		const isValidPassword = await compare(dto.password, response.password)
		if (!isValidPassword)
			throw new UnauthorizedException('Неверный логин или пароль')

		return response
	}

	async createTokens(
		userId: number
	): Promise<[acessToken: string, refreshToken: string]> {
		const data = {
			id: userId
		}

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(data, {
				secret: this.configService.get<string>('ACCESS_SECRET'),
				expiresIn: '30m'
			}),
			this.jwtService.signAsync(data, {
				secret: this.configService.get<string>('REFRESH_SECRET'),
				expiresIn: '1y'
			})
		])

		return [accessToken, refreshToken]
	}

	returnUserFields(credentials: CredentialsEntity): {
		id: number
		email: string
	} {
		return {
			id: credentials.user.id,
			email: credentials.email
		}
	}
}

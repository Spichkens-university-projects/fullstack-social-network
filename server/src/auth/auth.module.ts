import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getJwtConfig } from '../config/jwt.config'
import { RelationshipEntity } from '../relationship/entities/relationship.entity'
import { RelationshipService } from '../relationship/relationship.service'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CredentialsEntity } from './entities/credentials.entity'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		TypeOrmModule.forFeature([
			CredentialsEntity,
			UserEntity,
			RelationshipEntity
		]),
		PassportModule.register({ session: true })
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		UserService,
		Logger,
		RelationshipService
	]
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RelationshipEntity } from '../relationship/entities/relationship.entity'
import { RelationshipService } from '../relationship/relationship.service'
import { UserEntity } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, RelationshipEntity])],
	controllers: [UserController],
	providers: [UserService, RelationshipService]
})
export class UserModule {}

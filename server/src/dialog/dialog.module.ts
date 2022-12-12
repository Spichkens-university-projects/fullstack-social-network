import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from '../messages/entities/message.entity'
import { UserEntity } from '../user/entities/user.entity'
import { DialogController } from './dialog.controller'
import { DialogService } from './dialog.service'
import { DialogEntity } from './entities/dialog.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([DialogEntity, UserEntity, MessageEntity])
	],
	controllers: [DialogController],
	providers: [DialogService]
})
export class DialogModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DialogEntity } from '../dialog/entities/dialog.entity'
import { UserEntity } from '../user/entities/user.entity'
import { MessageEntity } from './entities/message.entity'
import { MessagesGateway } from './messages.gateway'
import { MessagesService } from './messages.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([MessageEntity, DialogEntity, UserEntity])
	],
	providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { DialogController } from './dialog.controller'
import { DialogService } from './dialog.service'
import { DialogEntity } from './entities/dialog.entity'

@Module({
	imports: [TypeOrmModule.forFeature([DialogEntity, UserEntity])],
	controllers: [DialogController],
	providers: [DialogService]
})
export class DialogModule {}

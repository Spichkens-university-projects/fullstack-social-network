import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { STATIC_FILE_PATH } from './config/static-file.config'
import { getTypeOrmConfig } from './config/typeorm.config'
import { DialogModule } from './dialog/dialog.module'
import { LikeModule } from './like/like.module'
import { MediaModule } from './media/media.module'
import { MessagesModule } from './messages/messages.module'
import { NotificationModule } from './notification/notification.module'
import { PostModule } from './post/post.module'
import { RelationshipModule } from './relationship/relationship.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: STATIC_FILE_PATH,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		ConfigModule.forRoot(),
		UserModule,
		AuthModule,
		NotificationModule,
		PostModule,
		RelationshipModule,
		MediaModule,
		MessagesModule,
		LikeModule,
		CommentModule,
		DialogModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}

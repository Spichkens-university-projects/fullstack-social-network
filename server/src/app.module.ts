import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { STATIC_FILE_PATH } from './config/static-file.config'
import { getTypeOrmConfig } from './config/typeorm.config'
import { NotificationModule } from './notification/notification.module'
import { PostModule } from './post/post.module'
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
		UserModule,
		AuthModule,
		NotificationModule,
		PostModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}

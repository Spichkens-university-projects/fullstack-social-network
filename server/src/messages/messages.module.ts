import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { MessagesGateway } from './messages.gateway'
import { MessagesService } from './messages.service'

@Module({
	imports: [
		RedisModule.forRoot({
			config: {
				url: 'redis://default:c90b3bc737d442cc8016fc6af9236a2d@eu2-vast-mink-31216.upstash.io:31216'
			}
		})
	],
	providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}

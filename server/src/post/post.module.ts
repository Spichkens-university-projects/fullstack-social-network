import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MediaService } from '../media/media.service'
import { RelationshipEntity } from '../relationship/entities/relationship.entity'
import { RelationshipService } from '../relationship/relationship.service'
import { PostEntity } from './entities/post.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, RelationshipEntity])],
	controllers: [PostController],
	providers: [PostService, RelationshipService, MediaService]
})
export class PostModule {}

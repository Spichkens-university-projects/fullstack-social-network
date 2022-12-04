import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RelationshipEntity } from '../relationship/entities/relationship.entity'
import { RelationshipService } from '../relationship/relationship.service'
import { CommentEntity } from './entities/comment.entity'
import { LikeEntity } from './entities/like.entity'
import { PostEntity } from './entities/post.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PostEntity,
			CommentEntity,
			LikeEntity,
			RelationshipEntity
		])
	],
	controllers: [PostController],
	providers: [PostService, RelationshipService]
})
export class PostModule {}

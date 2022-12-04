import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from '../user/user.service'
import { CommentEntity } from './entities/comment.entity'
import { LikeEntity } from './entities/like.entity'
import { PostEntity } from './entities/post.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity, LikeEntity])],
	controllers: [PostController],
	providers: [PostService, UserService]
})
export class PostModule {}

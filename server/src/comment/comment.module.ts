import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity } from '../post/entities/post.entity'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { CommentEntity } from './entities/comment.entity'
import { ReplyEntity } from './entities/reply.entity'

@Module({
	imports: [TypeOrmModule.forFeature([ReplyEntity, CommentEntity, PostEntity])],
	controllers: [CommentController],
	providers: [CommentService]
})
export class CommentModule {}

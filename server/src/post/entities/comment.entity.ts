import { Entity, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'
import { PostEntity } from './post.entity'

@Entity('comment')
export class CommentEntity extends BaseEntity {
	@ManyToOne(() => PostEntity, post => post.comments)
	post: PostEntity

	@ManyToOne(() => UserEntity, user => user.comments)
	user: UserEntity
}

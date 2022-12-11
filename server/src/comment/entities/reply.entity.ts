import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'
import { CommentEntity } from './comment.entity'

@Entity('reply')
export class ReplyEntity extends BaseEntity {
	@ManyToOne(() => UserEntity, user => user.comments)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => CommentEntity, comment => comment.replies, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'parent_id' })
	parent: CommentEntity

	@Column({ name: 'reply_body' })
	replyBody: string
}

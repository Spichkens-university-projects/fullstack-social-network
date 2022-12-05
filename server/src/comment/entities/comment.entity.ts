import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { PostEntity } from '../../post/entities/post.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'
import { ReplyEntity } from './reply.entity'

@Entity('comment')
export class CommentEntity extends BaseEntity {
	@ManyToOne(() => PostEntity, post => post.comments)
	@JoinColumn({ name: 'post_id' })
	post: PostEntity

	@ManyToOne(() => UserEntity, user => user.comments)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@Column({ name: 'comment_body' })
	commentBody: string

	@OneToMany(() => ReplyEntity, reply => reply.parent)
	@JoinColumn()
	replies: ReplyEntity[]
}

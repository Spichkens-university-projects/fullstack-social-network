import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CommentEntity } from '../../comment/entities/comment.entity'
import { LikeEntity } from '../../like/entities/like.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('post')
export class PostEntity extends BaseEntity {
	@Column()
	description: string

	@Column({ name: 'media_path' })
	mediaPath: string

	@ManyToOne(() => UserEntity, user => user.id)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => LikeEntity, like => like.post)
	@JoinColumn()
	likes: LikeEntity[]

	@OneToMany(() => CommentEntity, comment => comment.post)
	@JoinColumn()
	comments: CommentEntity[]
}

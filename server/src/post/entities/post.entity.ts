import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'
import { CommentEntity } from './comment.entity'
import { LikeEntity } from './like.entity'

@Entity('post')
export class PostEntity extends BaseEntity {
	@Column()
	description: string

	@Column({ name: 'media_path' })
	mediaPath: string

	@ManyToOne(() => UserEntity, user => user.id)
	user: UserEntity

	@OneToMany(() => LikeEntity, like => like.id)
	likes: LikeEntity[]

	@OneToMany(() => CommentEntity, comment => comment.id)
	comments: CommentEntity[]
}

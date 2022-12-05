import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { PostEntity } from '../../post/entities/post.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('like')
export class LikeEntity extends BaseEntity {
	@ManyToOne(() => PostEntity, post => post.likes)
	@JoinColumn({ name: 'post_id' })
	post: PostEntity

	@ManyToOne(() => UserEntity, user => user.likes)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity
}

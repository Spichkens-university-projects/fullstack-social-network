import { Entity, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'
import { PostEntity } from './post.entity'

@Entity('like')
export class LikeEntity extends BaseEntity {
	@ManyToOne(() => PostEntity, post => post.likes)
	post: PostEntity

	@ManyToOne(() => UserEntity, user => user.likes)
	user: UserEntity
}

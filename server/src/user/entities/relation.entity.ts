import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { UserEntity } from './user.entity'

@Entity('relation')
export class RelationEntity extends BaseEntity {
	@ManyToOne(() => UserEntity, user => user.relations)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, user => user.relations)
	@JoinColumn({ name: 'to_user_id' })
	toUser: UserEntity
}

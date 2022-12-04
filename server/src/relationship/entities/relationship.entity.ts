import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

export enum RelationType {
	'request' = 1,
	'await' = 2
}

export enum DecisionType {
	'accepted' = 1,
	'canceled' = 2
}

@Entity('relation')
export class RelationshipEntity extends BaseEntity {
	@ManyToOne(() => UserEntity, user => user.relationships)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, user => user.relationships)
	@JoinColumn({ name: 'to_user_id' })
	toUser: UserEntity

	@Column({ nullable: true })
	decision: DecisionType
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('message')
export class MessageEntity extends BaseEntity {
	@Column()
	message: string

	@ManyToOne(() => UserEntity, user => user.messages)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@Column({ name: 'room_id' })
	roomId: string
}

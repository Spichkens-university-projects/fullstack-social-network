import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('dialogs')
export class DialogEntity extends BaseEntity {
	@ManyToOne(() => UserEntity, user => user.dialogs)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToOne(() => UserEntity, user => user.dialogs)
	@JoinColumn({ name: 'with_user_id' })
	withUser: UserEntity

	@Column({ name: 'room_id' })
	roomId: string
}

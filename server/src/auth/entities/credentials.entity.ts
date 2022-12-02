import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('credential')
export class CredentialsEntity extends BaseEntity {
	@OneToOne(() => UserEntity, user => user.credentials)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@Column({ unique: true })
	email: string

	@Column()
	password: string
}

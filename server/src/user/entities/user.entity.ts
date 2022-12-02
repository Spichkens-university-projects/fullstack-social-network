import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { CredentialsEntity } from '../../auth/entities/credentials.entity'
import { BaseEntity } from '../../utils/base.entity'
import { RelationEntity } from './relation.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
	@Column()
	name: string

	@Column()
	surname: string

	@Column({ name: 'avatar_path', nullable: true })
	avatarPath: string

	@OneToOne(() => CredentialsEntity, credentials => credentials.user)
	credentials: CredentialsEntity

	@OneToMany(() => RelationEntity, relation => relation.fromUser)
	relations: RelationEntity[]
}

import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { CredentialsEntity } from '../../auth/entities/credentials.entity'
import { CommentEntity } from '../../comment/entities/comment.entity'
import { DialogEntity } from '../../dialog/entities/dialog.entity'
import { LikeEntity } from '../../like/entities/like.entity'
import { MessageEntity } from '../../messages/entities/message.entity'
import { PostEntity } from '../../post/entities/post.entity'
import { RelationshipEntity } from '../../relationship/entities/relationship.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
	@Column()
	name: string

	@Column({ unique: true, nullable: true })
	nickname: string

	@Column()
	surname: string

	@Column({ nullable: true })
	status: string

	@Column({ name: 'avatar_path', nullable: true })
	avatarPath: string

	@OneToOne(() => CredentialsEntity, credentials => credentials.user)
	credentials: CredentialsEntity

	@OneToMany(() => RelationshipEntity, relationship => relationship.fromUser)
	relationships: RelationshipEntity[]

	@OneToMany(() => PostEntity, post => post.user)
	posts: PostEntity[]

	@OneToMany(() => LikeEntity, like => like.user)
	likes: LikeEntity[]

	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity[]

	@OneToMany(() => DialogEntity, dialog => dialog.user)
	@JoinColumn({ name: 'dialog_id' })
	dialogs: DialogEntity[]

	@OneToMany(() => MessageEntity, message => message.user)
	messages: MessageEntity[]
}

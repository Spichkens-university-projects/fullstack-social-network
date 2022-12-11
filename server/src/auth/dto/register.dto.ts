import { IsNotEmpty } from 'class-validator'
import { LoginDto } from './login.dto'

export class RegisterDto extends LoginDto {
	@IsNotEmpty({ message: 'Поле "Имя" не может быть пустым' })
	name: string

	@IsNotEmpty({ message: 'Поле "Фамилия" не может быть пустым' })
	surname: string

	nickname: string
}

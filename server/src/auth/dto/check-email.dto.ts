import { IsEmail, IsNotEmpty } from 'class-validator'

export class CheckEmailDto {
	@IsNotEmpty({ message: 'Поле "Логин" не может быть пустым' })
	@IsEmail({ message: 'Неверный формат поля "Логин"' })
	email: string
}

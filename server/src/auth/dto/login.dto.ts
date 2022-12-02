import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
	@IsNotEmpty({ message: 'Поле "Логин" не может быть пустым' })
	@IsEmail({ message: 'Неверный формат поля "Логин"' })
	email: string

	@IsNotEmpty({ message: 'Поле "Пароль" не может быть пустым' })
	@MinLength(4, { message: 'Минимальная длинна пароля - 4 символа' })
	@MaxLength(16, { message: 'Максимальная длинна пароля - 16 символов' })
	password: string
}

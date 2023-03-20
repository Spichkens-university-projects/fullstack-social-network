import { Controller, Get } from '@nestjs/common'

@Controller('test')
export class AppController {
	@Get()
	checkIfServerWorks(): { message: string } {
		return { message: 'Dima lox' }
	}
}

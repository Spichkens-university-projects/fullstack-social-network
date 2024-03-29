import * as cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())
	app.enableCors({
		credentials: true,
		origin: ['http://localhost:3000']
	})
	app.setGlobalPrefix('api')
	await app.listen(3001)
}

bootstrap()

import * as cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { AppModule } from './app.module'

const server = express()
const adapter = new ExpressAdapter(server)

async function bootstrap() {
	const app = await NestFactory.create(AppModule, adapter)

	app.use(cookieParser())
	app.enableCors({
		credentials: true,
		origin: ['http://localhost:3000']
	})
	app.setGlobalPrefix('api')
	await app.listen(3000)
}

export const api = functions.https.onRequest(server)

bootstrap()

import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthRequired } from '../auth/decorators/auth.decorator'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post('upload')
	@AuthRequired()
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('media'))
	async uploadMedialFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return await this.mediaService.saveMedia(mediaFile, folder)
	}
}

import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UtilsService } from './utils.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SetFacebookTokenDto, UploadImageDto } from './utils.dto';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @ApiBody({ type: SetFacebookTokenDto })
  @UseGuards(AuthGuard(), AdminGuard)
  @Post('/facebook/page-token')
  async setPageToken(@Body('token') token: string) {
    const result = await this.utilsService.storeKeyValue(
      'facebook-page-token',
      token,
    );

    return result;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  @Post('/resources')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@Req() req) {
    const fileName = req.file.key;
    const url = 'https://cute-cat-bucket-2.s3.ap-northeast-2.amazonaws.com/';

    const response = {
      imageUrl: url + fileName,
    };

    return response;
  }
}

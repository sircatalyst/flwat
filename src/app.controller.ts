import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostRuleValidationDTO } from './app.dto';
import { _responseType } from './app.interface';
import { AppService } from './app.service';
import { customValidator } from './app.validator';

@Controller()
@UsePipes(new ValidationPipe())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): _responseType {
    return this.appService.getHello();
  }

  @Post('validate-rule')
  @HttpCode(200)
  postValidateRule(
    @Body() payload: PostRuleValidationDTO,
  ): _responseType {
    customValidator(payload);
    return this.appService.handlePostValidateRule(payload);
  }
}

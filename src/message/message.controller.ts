import { AuthGuard } from './../auth/auth.guard';
import { MessageService } from './message.service';
import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDec } from 'src/user/user.decorator';
import { MessageDto } from './message.dto';

@Controller('message')
export class MessageController {
  logger = new Logger('MessageController');
  constructor(private serviceMesssage: MessageService) {}

  private logData(option) {
    option.user && this.logger.log('User' + JSON.stringify(option.user));
    option.data && this.logger.log('Data' + JSON.stringify(option.data));
    option.id && this.logger.log('Message' + JSON.stringify(option.id));
  }

  @Get()
  getAll() {
    return this.serviceMesssage.getAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createMessage(@UserDec('id') user, @Body() data) {
    return this.serviceMesssage.sendMessage(user, data);
  }
}

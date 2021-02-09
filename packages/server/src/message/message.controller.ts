import { AuthGuard } from './../auth/auth.guard';
import { MessageService } from './message.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDec } from 'src/user/user.decorator';

@Controller('message')
export class MessageController {
  constructor(private serviceMesssage: MessageService) {}

  @Get()
  @UseGuards(new AuthGuard())
  getAll() {
    return this.serviceMesssage.getAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createMessage(@UserDec('id') user, @Body() data) {
    return this.serviceMesssage.sendMessage(user, data);
  }

  @Delete(':id')
  deleteMess(@Param('id') id) {
    return this.serviceMesssage.removeMessage(id);
  }
}

import { AuthGuard } from './../auth/auth.guard';
import { userDto } from './user.dto';
import { UserService } from './user.service';
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
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  ApiUser() {
    return 'Here be API';
  }

  @Get('/all')
  @UseGuards(new AuthGuard())
  getAllUser() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserInfo(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() user: userDto) {
    return this.userService.login(user);
  }

  @Post('/reg')
  @UsePipes(new ValidationPipe())
  registrationUser(@Body() user: UserEntity) {
    return this.userService.registrationUser(user);
  }
}

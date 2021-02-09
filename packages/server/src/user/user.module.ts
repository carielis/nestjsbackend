import { UserResolver } from './user.resolver';
import { MessageEntit } from '../message/message.entity';
import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MessageEntit])],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}

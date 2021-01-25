import { UserEntity } from '../user/user.entity';
import { MessageEntit } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntit, UserEntity])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

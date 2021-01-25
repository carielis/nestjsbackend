import { UserEntity } from '../user/user.entity';
import { MessageEntit } from './message.entity';
import { Headers, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from './message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntit)
    private messageRepository: Repository<MessageEntit>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    return await this.messageRepository.find({ relations: ['author'] });
  }

  async sendMessage(userId: string, data) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const text = await data.message;
    const message = await this.messageRepository.create({
      message: text,
      author: user,
    });
    return await this.messageRepository.save(message);
  }
}

import { AuthGuard } from './../auth/auth.guard';
import { MessageService } from './message.service';
import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query()
  async message() {
    return await this.messageService.getAll();
  }

  @UseGuards(new AuthGuard())
  @Mutation()
  async sendMessage(@Context('user') user, @Args() message: string) {
    const { id: userId } = user;
    return await this.messageService.sendMessage(userId, message);
  }
}

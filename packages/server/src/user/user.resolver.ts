import { AuthGuard } from './../auth/auth.guard';
import { userDto } from './user.dto';
import { UserService } from './user.service';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query()
  async users(@Args('page') page: number) {
    return await this.userService.getAll(page);
  }

  @Query()
  user(@Args('username') username: string) {
    return this.userService.read(username);
  }
  @Query()
  @UseGuards(new AuthGuard())
  whoami(@Context('user') user) {
    const { username } = user;
    return this.userService.read(username);
  }

  @Mutation()
  login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: userDto = { username, password };
    return this.userService.login(user);
  }

  @Mutation()
  register(@Args('username') username, @Args('password') password) {
    const user: userDto = { username, password };
    return this.userService.registrationUser(user);
  }
}

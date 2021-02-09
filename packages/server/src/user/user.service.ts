import { userDto } from './user.dto';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async getAll(page = 1): Promise<any> {
    const users = await this.repository.find({
      relations: ['messages'],
      skip: 25 * (page - 1),
      take: 25,
    });
    return users.map((user) => user.toResponseObject(false));
  }

  async read(username: string) {
    const user = await this.repository.findOne({
      where: { username },
      relations: ['messages'],
    });
    return user.toResponseObject(false);
  }

  async findOne(id: string): Promise<userDto> {
    return await this.repository.findOne(id);
  }

  async registrationUser(data: userDto) {
    const { username } = data;

    let user = await this.repository.findOne({ where: { username } });
    if (user) {
      throw new Error('Name reserved');
    }
    user = await this.repository.create(data);
    await this.repository.save(user);
    return user.toResponseObject();
  }

  async login(users: userDto) {
    const { username, password } = users;
    const user = await this.repository.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error();
    }
    return user.toResponseObject();
  }

  async removeUser(id: string): Promise<any> {
    return await this.repository.delete(id);
  }
}

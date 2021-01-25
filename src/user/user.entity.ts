import { MessageEntit } from 'src/message/message.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text') password: string;

  @CreateDateColumn() createdDate: Date;

  @OneToMany((type) => MessageEntit, (message) => message.author, {
    cascade: true,
  })
  messages: MessageEntit[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken = true) {
    const { id, createdDate, username, token } = this;
    const responseObject = { id, createdDate, username, token };
    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username } = this;

    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '1d' },
    );
  }
}

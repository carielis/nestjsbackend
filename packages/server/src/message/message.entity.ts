import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
export class MessageEntit {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn() dateSend: Date;
  @Column('text') message: string;
  @ManyToOne((type) => UserEntity, (author) => author.messages)
  author: UserEntity;
}

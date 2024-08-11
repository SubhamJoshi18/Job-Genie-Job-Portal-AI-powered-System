import {
  BaseEntity,
  Collection,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'bool',
    default: false,
  })
  receivedNotifications: boolean;

  @Column({
    type: 'bool',
    default: false,
  })
  receivedEmails: boolean;

  @Column({
    type: 'bool',
    default: false,
  })
  receivedMessages: boolean;

  @Column({
    type: 'bool',
    default: true,
  })
  is_active: boolean;

  @OneToOne(() => User, (user) => user.userProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

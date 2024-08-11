import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'blocklist' })
export class BlockList extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  token: string;

  @CreateDateColumn()
  token_created_at: Date;

  @UpdateDateColumn()
  token_updated_at: Date;
}

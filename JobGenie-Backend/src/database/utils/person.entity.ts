import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'person' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  middleName: string;

  @Column({
    type: 'enum',
    enum: GenderType,
    nullable: false,
  })
  gender: string;
}

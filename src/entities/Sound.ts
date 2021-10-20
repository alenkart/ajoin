import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Sound extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  author: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Sound } from "./Sound";

@Entity()
export class SoundRanking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;

  @OneToOne(() => Sound)
  @JoinColumn()
  sound: Sound;
}

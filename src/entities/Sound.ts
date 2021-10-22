import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Sound extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;

  @Column()
  soundId: string;

  @Column()
  url: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  static findByGuildId(guildId: string) {
    return this.find({ where: { guildId } });
  }

  static findByGuildIdAndSoundId(guildId: string, name: string) {
    return this.findOne({ where: { guildId, name } });
  }

  static async replace(sound: {
    guildId: string;
    soundId: string;
    url: string;
    author: string;
  }) {
    const _sound = await this.findByGuildIdAndSoundId(
      sound.guildId,
      sound.soundId
    );

    if (_sound) {
      await this.delete(_sound);
    }

    await this.insert(sound);
  }
}

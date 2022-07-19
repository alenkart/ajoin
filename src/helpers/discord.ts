import { Interaction, VoiceChannel } from "discord.js";

export function isVoiceEmpty(channel: VoiceChannel) {
  return channel.members.filter((member) => !member.user.bot).size === 0;
}

export function getVoiceChannel(interaction: Interaction) {
  const { user, guild } = interaction;
  const member = guild.members.cache.get(user.id);
  return member.voice.channel as VoiceChannel;
}

export function getUserMention(userId: string) {
  return `<@!${userId}>`;
}

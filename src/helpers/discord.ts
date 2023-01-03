import { BaseInteraction, VoiceChannel } from "discord.js";

export function isVoiceEmpty(channel: VoiceChannel) {
  return channel.members.filter((member) => !member.user.bot).size === 0;
}

export function getVoiceChannel(interaction: BaseInteraction) {
  const { user, guild } = interaction;

  if (!user.id) return;

  const member = guild?.members.cache.get(user.id);
  return member?.voice.channel as VoiceChannel;
}

export function getUserMention(userId: string) {
  return `<@!${userId}>`;
}

export function getInviteUrl(client_id: string) {
  const scope = ["bot", "applications.commands"].join(" ");

  const query = new URLSearchParams({
    scope,
    client_id,
    permissions: "0",
  });

  return `https://discord.com/api/oauth2/authorize?${query}`;
}

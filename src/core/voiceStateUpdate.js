const PlaySound = require("./playsound");
const { getUserMention } = require("./utils");

function VoiceStateUpdate(oldMember, newMember, client) {
    this.client = client;
    this.oldMember = oldMember;
    this.newMember = newMember;
    this.member = this.newMember ? this.newMember : this.oldMember;

    this.isBot = function () {
        return this.member && this.member.id === this.client.user.id;
    };

    this.handler = function () {
        const newChannel = this.newMember.channel;
        const oldChannel = this.oldMember.channel;

        if (this.isBot()) {
            this.onBot && this.onBot();
        } else if (!oldChannel) {
            this.onJoinChannel();
        } else if (!newChannel) {
            this.onLeaveChannel();
        } else if (!oldMember.selfMute && newMember.selfMute) {
            this.onMute();
        } else if (oldMember.selfMute && !newMember.selfMute) {
            this.onUnmute();
        } else if (!oldMember.selfDeaf && newMember.selfDeaf) {
            this.onDeaf();
        } else if (oldMember.selfMute && !newMember.selfMute) {
            this.onUnmute();
        } else if (oldMember.channelID !== newMember.channelID) {
            this.onSwtichChannel();
        } else {
            this.onUnhandled();
        }
    };

    this.onBot = function () { };
    this.onJoinChannel = function () { };
    this.onLeaveChannel = function () { };
    this.onSwtichChannel = function () { };
    this.onMute = function () { };
    this.onUnmute = function () { };
    this.onDeaf = function () { };
    this.onUndeaf = function () { };
    this.onUnhandled = function () { };
}

function playUserSound(newMember) {
    const userMention = getUserMention(newMember.id);
    const playSound = new PlaySound();

    playSound.playSound({
        channel: newMember.channel,
        guildId: newMember.guild.id,
        soundId: userMention,
    });
}

module.exports = async function (oldMember, newMember, client) {
    try {
        const voiceStateUpdate = new VoiceStateUpdate(oldMember, newMember, client);
        voiceStateUpdate.onJoinChannel = () => playUserSound(newMember);
        voiceStateUpdate.onSwtichChannel = () => playUserSound(newMember);
        voiceStateUpdate.handler();
    } catch (error) {
        console.log("voiceStateUpdate", error);
    }
};
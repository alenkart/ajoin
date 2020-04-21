
const playSound = require("./playsound");
const { getUserMention } = require("./utils");

function VoiceStateUpdate(client, oldMember, newMember) {
    this.client = client;
    this.oldMember = oldMember;
    this.newMember = newMember;
    this.member = this.newMember ? this.newMember : this.oldMember;

    this.isBot = function () {
        return this.member && this.member.id === this.client.user.id;
    }

    this.handler = function () {

        const newChannel = this.newMember.channel;
        const oldChannel = this.oldMember.channel;

        if (this.isBot()) {
            this.onBot();
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
    }

    this.onBot = function () {
        console.log("Bot");
    }

    this.onJoinChannel = function () {
        console.log("Join");
    }

    this.onLeaveChannel = function () {
        console.log("Leave");
    }

    this.onSwtichChannel = function () {
        console.log("Switch");
    }

    this.onMute = function () {
        console.log("Mute");
    }

    this.onUnmute = function () {
        console.log("Unmute");
    }

    this.onDeaf = function () {
        console.log("Deaf");
    }

    this.onUndeaf = function () {
        console.log("Undeaf");
    }

    this.onUnhandled = function () {
        console.log("Unhandled");
    }

}

function playUserSound(newMember) {
    const userMention = getUserMention(newMember.id);
    playSound(newMember.channel, newMember.guild.id, userMention);
}

module.exports = async function (client, oldMember, newMember) {

    try {
        const voiceStateUpdate = new VoiceStateUpdate(client, oldMember, newMember);
        voiceStateUpdate.onJoinChannel = () => playUserSound(newMember);
        voiceStateUpdate.onSwtichChannel = () => playUserSound(newMember);
        voiceStateUpdate.handler();
    } catch (error) {
        console.log(error);
    }

};
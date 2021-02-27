import { VoiceState, Client } from 'discord.js';

type Event =
	| 'bot'
	| 'switchChannel'
	| 'joinChannel'
	| 'leaveChannel'
	| 'deaf'
	| 'undeaf'
	| 'mute'
	| 'unmute';

class VoiceStateUpdate {
	private client: Client;
	private oldVoiceState: VoiceState;
	private newVoiceState: VoiceState;

	private map: { [id: string]: () => void };

	constructor(
		client: Client,
		oldVoiceState: VoiceState,
		newVoiceState: VoiceState
	) {
		this.map = {};
		this.client = client;
		this.oldVoiceState = oldVoiceState;
		this.newVoiceState = newVoiceState;
	}

	private execute(event: Event) {
		this.map[event]?.();
	}

	on(event: Event, callback: () => void) {
		this.map[event] = callback;
	}

	handle() {
		const newVoice = this.newVoiceState;
		const oldVoice = this.oldVoiceState;

		if (this.newVoiceState.id === this.client.user.id) {
			this.execute('bot');
		} else {
			if (!oldVoice.channelID && newVoice.channelID) {
				this.execute('joinChannel');
			} else if (oldVoice.channelID && !newVoice.channelID) {
				this.execute('leaveChannel');
			} else if (oldVoice.channelID !== newVoice.channelID) {
				this.execute('switchChannel');
			} else if (!oldVoice.selfDeaf && newVoice.selfDeaf) {
				this.execute('deaf');
			} else if (oldVoice.selfDeaf && !newVoice.selfDeaf) {
				this.execute('undeaf');
			} else if (!oldVoice.selfMute && newVoice.selfMute) {
				this.execute('mute');
			} else if (oldVoice.selfMute && !newVoice.selfMute) {
				this.execute('unmute');
			}
		}
	}
}

export default VoiceStateUpdate;

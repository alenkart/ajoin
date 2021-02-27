import { VoiceState, Client } from 'discord.js';

export type Event = 'switchChannel' | 'joinChannel' | 'leaveChannel';

export type Params = {
	client: Client;
	oldVoiceState: VoiceState;
	newVoiceState: VoiceState;
};

export type handler = (params: Params) => Event | void;

export type eventCallback = (event: Event) => void;

export const joinChannel: handler = ({ oldVoiceState, newVoiceState }) => {
	return !oldVoiceState.channelID && newVoiceState.channelID
		? 'joinChannel'
		: null;
};

export const leaveChannel: handler = ({ oldVoiceState, newVoiceState }) => {
	return oldVoiceState.channelID && !newVoiceState.channelID
		? 'leaveChannel'
		: null;
};

export const switchChannel: handler = ({ oldVoiceState, newVoiceState }) => {
	const exists = oldVoiceState.channelID && oldVoiceState.channelID;
	const diff = oldVoiceState.channelID !== newVoiceState.channelID;
	return exists && diff ? 'switchChannel' : null;
};

class VoiceStateUpdate {
	private client: Client;
	private oldVoiceState: VoiceState;
	private newVoiceState: VoiceState;

	private map: { [id: string]: eventCallback };
	private handlers: handler[] = [joinChannel, leaveChannel, switchChannel];

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
		this.map[event]?.(event);
	}

	on(events: Event | Event[], callback: eventCallback) {
		events = events instanceof Array ? events : [events];

		events.map((event) => {
			this.map[event] = callback;
		});
	}

	handle() {
		if (this.newVoiceState.id === this.client.user.id) {
			return;
		}

		const params = {
			client: this.client,
			oldVoiceState: this.oldVoiceState,
			newVoiceState: this.newVoiceState,
		};

		for (let handler of this.handlers) {
			const event = handler(params);

			if (event) {
				this.execute(event);
				return;
			}
		}
	}
}

export default VoiceStateUpdate;

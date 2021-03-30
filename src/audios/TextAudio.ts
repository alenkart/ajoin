import { getAudioUrl } from "google-tts-api";
import { Audio, AudioConstructor } from "@ajoin/core";

type TextAudioConstructor = {
  text: string;
  lang: string;
} & AudioConstructor;

export class TextAudio extends Audio {
  text: string;
  lang: string;

  constructor({ guildId, channel, text, lang }: TextAudioConstructor) {
    super({ guildId, channel });
    this.text = text;
    this.lang = lang;
  }

  public async getURL() {
    const url = await getAudioUrl(this.text, {
      lang: this.lang == "en" ? "en-US" : "es-ES",
      slow: false,
    });

    return url;
  }

  public toString(): string {
    return this.text.substring(0, 20);
  }
}

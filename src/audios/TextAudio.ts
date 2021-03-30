import { getAudioUrl } from "google-tts-api";
import { Audio, AudioConstructor } from "@ajoin/core";

type Lang = "en" | "es" | "ja" | "fr";

type TextAudioConstructor = {
  text: string;
  lang: Lang;
} & AudioConstructor;

export class TextAudio extends Audio {
  text: string;
  lang: Lang;

  constructor({ guildId, channel, text, lang }: TextAudioConstructor) {
    super({ guildId, channel });
    this.text = text;
    this.lang = lang;
  }

  public async getURL() {
    const url = await getAudioUrl(this.text, {
      lang: this.lang,
      slow: false,
    });

    return url;
  }

  public toString(): string {
    return this.text.substring(0, 20);
  }
}

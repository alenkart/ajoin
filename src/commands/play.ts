import Command from "@ajoin/core/Command";
import AudioPlayer from "@ajoin/core/AudioPlayer";

const url =
  "https://www.myinstants.com/media/sounds/jeje_boy_-1932928420844034623.mp3";

const play = new Command("play");

play.run = async ({ message }) => {
  const channel = message.member?.voice.channel;

  const audioPlayer = new AudioPlayer();
  audioPlayer.play(channel as any, url);
};

export default play;

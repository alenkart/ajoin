import Command from "@ajoin/core/Command";
import AudioModel from "@ajoin/models/Audio";

const add = new Command("add");

add.handler = async ({ message, args }) => {
  const [name, url] = args;

  await AudioModel.create({
    name,
    url,
    author: message.author.id,
  });
};

export default add;

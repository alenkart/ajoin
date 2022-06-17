import Command from "@ajoin/core/Command";

const ping = new Command("ping");

ping.args = [
  {
    validate: (input) => /\w{1,8}/.test(input),
  },
  {
    validate: (input) => /\d{1,30}/.test(input),
  },
  {
    validate: (input) => /\d{1,30}/.test(input),
  },
];

ping.handler = ({ message }) => {
  message.reply("pong");
};

export default ping;

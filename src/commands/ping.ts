import Command from "@ajoin/core/Command";

const pingCmd = new Command("ping", {
  args: [
    {
      validate: (input) => /\w{1,8}/.test(input),
    },
    {
      validate: (input) => /\d{1,30}/.test(input),
    },
    {
      validate: (input) => /\d{1,30}/.test(input),
    },
  ],
  handler: (args) => {
    const [name, url] = args;
    console.log(name, url);
  },
});

export default pingCmd;

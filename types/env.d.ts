export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "production" | "development";
      DISCORD_TOKEN: string;
      GUILD_ID: string;
    }
  }
}

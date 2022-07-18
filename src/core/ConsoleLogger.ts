import Logger from "@ajoin/core/Logger";
import LoggerFormat from "./LoggerFormat";

enum Colors {
  Default = "\x1b[0m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[36m",
}

class ConsoleLogger extends Logger {
  get env() {
    return `Env: ${process.env.ENV || "development"}`;
  }

  format(level: string, ...texts: string[]) {
    const format = new LoggerFormat();

    format.level(level).date().text(this.env);

    texts.forEach((text, index) => format.text(`${index + 1} - ${text}`));

    return format.build();
  }

  log(...texts: string[]) {
    console.log(...texts);
  }

  info(...texts: string[]) {
    const value = this.format("INFO ✨", ...texts);

    console.log(`${Colors.Blue}${value}${Colors.Default}`);

    return this;
  }

  debug(...texts: string[]) {
    if (process.env.ENV === "production") return;

    const value = this.format("DEBUG 🧪", ...texts);

    console.log(`${Colors.Green}${value}${Colors.Default}`);

    return this;
  }

  warn(...texts: string[]) {
    const value = this.format("WARN ⚠️", ...texts);

    console.log(`${Colors.Yellow}${value}${Colors.Default}`);

    return this;
  }

  error(...texts: string[]) {
    const value = this.format("ERROR 🔥", ...texts);

    console.log(`${Colors.Red}${value}${Colors.Default}`);

    return this;
  }
}

export default ConsoleLogger;

abstract class Logger {
  abstract log(...texts: string[]): void;
  abstract info(...texts: string[]): void;
  abstract debug(...texts: string[]): void;
  abstract warn(...texts: string[]): void;
  abstract error(...texts: string[]): void;
}

export default Logger;

class Timeout {
  private timeout?: NodeJS.Timeout;

  clean() {
    this.timeout && clearTimeout(this.timeout);
  }

  start(callback: () => void, ms: number) {
    this.timeout = setTimeout(() => callback(), ms);
  }
}

export default Timeout;

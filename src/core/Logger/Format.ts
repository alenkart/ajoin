class Format {
  content: string[] = [];

  level(level: string) {
    this.content.push(`Level: ${level}`);
    return this;
  }

  date() {
    this.content.push(`Date: ${new Date()}`);
    return this;
  }

  text(text) {
    this.content.push(text);
    return this;
  }

  newLine() {
    this.content.push("\n");
    return this;
  }

  build() {
    return this.content.join("\n");
  }
}

export default Format;

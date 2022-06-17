class Lexer {
  cursor: number = -1;

  get length() {
    return this.input.length;
  }

  constructor(readonly input: string) {}

  parseToken() {
    let token = "";
    let char = this.nextChar();

    while (char != " " && typeof char === "string") {
      token += char;
      char = this.nextChar();
    }

    return token;
  }

  nextChar() {
    this.cursor++;
    return this.currentChar();
  }

  currentChar() {
    return this.input[this.cursor];
  }

  tokenize() {
    this.cursor = -1;
    const tokens: string[] = [];

    while (this.cursor < this.length) {
      const token = this.parseToken();
      tokens.push(token);
    }

    return tokens;
  }
}

export default Lexer;

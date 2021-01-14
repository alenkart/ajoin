class CommandError extends Error {
    constructor(message) {
        super(message);
        this.displayable = true;
        this.name = "CommandError";
    }
}

module.exports = {
    CommandError,
};
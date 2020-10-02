const help = require("../commands/help");
const play = require("../commands/play");
const show = require("../commands/show");
const set = require("../commands/set");
const remove = require("../commands/remove");
const invite = require("../commands/invite");
const talk = require("./talk");

module.exports = {
    help,
    play,
    show,
    set,
    remove,
    invite,
    ...talk,
}
const users = require("./user");
const lists = require("./list");
const bans = require("./ban");
const rentals = require("./rental");
const returns = require("./return");
const genres = require("./genre");
const shelves = require("./shelf");
const branches = require("./branch");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/lists", lists);
  app.use("/bans", bans);
  app.use("/rentals", rentals);
  app.use("/returns", returns);
  app.use("/genres", genres);
  app.use("/shelves", shelves);
  app.use("/branches", branches);
};

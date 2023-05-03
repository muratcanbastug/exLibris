const users = require("./user");
const lists = require("./list");
const bans = require("./ban");
const rentals = require("./rental");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/lists", lists);
  app.use("/bans", bans);
  app.use("/rentals", rentals);
};

const users = require("./user");
const lists = require("./list");
const bans = require("./ban");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/lists", lists);
  app.use("/bans", bans);
};

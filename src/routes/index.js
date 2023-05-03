const users = require("./user");
const lists = require("./list");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/lists", lists);
};

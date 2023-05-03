const users = require("./user");
const lists = require("./list");
const userLists = require("./userList");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/lists", lists);
  app.use("/users/:id/lists", userLists);
};

const users = require("./user");
const lists = require("./list");
const bans = require("./ban");
const rentals = require("./rental");
const returns = require("./return");
const genres = require("./genre");
const shelves = require("./shelf");
const branches = require("./branch");
const admins = require("./admin");
const userTypes = require("./userType");
const reservations = require("./reservation");
const items = require("./item");
const login = require("./login");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/lists", lists);
  app.use("/bans", bans);
  app.use("/rentals", rentals);
  app.use("/returns", returns);
  app.use("/genres", genres);
  app.use("/shelves", shelves);
  app.use("/branches", branches);
  app.use("/admins", admins);
  app.use("/user-types", userTypes);
  app.use("/reservations", reservations);
  app.use("/items", items);
  app.use("/login", login);
};

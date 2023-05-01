const express = require("express");
const mountRoutes = require("./src/routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const bodyParser = express.json;
app.use(bodyParser());

mountRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

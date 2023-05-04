const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all user types
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM user_type");
  res.status(200).json(rows);
});

const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

// Get all rentals at that time
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM all_current_rentals");
  res.status(200).json(rows);
});

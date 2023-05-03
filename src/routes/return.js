const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all return records
router.get("/", async (req, res) => {
  const { rows } = await db.query(
    "SELECT * FROM return_history ORDER BY return_date"
  );
  res.status(200).json(rows);
});

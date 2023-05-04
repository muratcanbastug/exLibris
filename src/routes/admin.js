const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all branches with their shelves
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM admin");
  res.status(200).json(rows);
});

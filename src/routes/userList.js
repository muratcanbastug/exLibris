const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

// Get user's all lists
router.get("/:id/lists", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM list WHERE user_id = $1", [
    id,
  ]);
  res.status(200).json(rows);
});

// Add new list
router.post("/:id/lists", async (req, res) => {
  const { id } = req.params;
  const { list_id, list_name } = req.body;
  const { rows } = await db.query("SELECT * FROM list WHERE user_id = $1", [
    id,
  ]);
  res.status(200).json(rows);
});

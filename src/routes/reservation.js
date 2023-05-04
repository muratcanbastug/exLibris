const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all reservations at that time
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM all_current_reservations");
  res.status(200).json(rows);
});

// Get the item rental at that time
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM all_current_reservations WHERE item_id = $1",
    [id]
  );
  res.status(200).json(rows);
});

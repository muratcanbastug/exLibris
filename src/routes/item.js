const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all items
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM item_search");
  res.status(200).json(rows);
});

// Get all avaliable items
router.get("/avaliables", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM avaliable_items");
  res.status(200).json(rows);
});

// Get the item
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM item_search WHERE item_id = $1",
    [id]
  );
  res.status(200).json(rows);
});

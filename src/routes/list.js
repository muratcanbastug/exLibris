const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

// Get list items
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT list_name, name, rate, publication_date FROM user_to_see_list WHERE list_id = $1",
    [id]
  );
  res.status(200).json(rows);
});

// delete list
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM list WHERE list_id = $1", [id]);
    res.status(200).json("The list was deleted successfully.");
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

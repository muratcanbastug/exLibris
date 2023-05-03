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

// Delete list
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM list WHERE list_id = $1", [id]);
    res.status(200).json("The list was deleted successfully.");
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the list." });
    };
  }
});

// Update list name
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { new_name } = req.body;
  console.log(new_name);
  try {
    await db.query(
      "UPDATE list SET list_name = $1::VARCHAR WHERE list_id = $2::INTEGER",
      [new_name, id]
    );
    res.status(200).json("The list name was updated successfully.");
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the list name." });
    };
  }
});

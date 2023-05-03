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

// Add item to list
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { item_id } = req.body;
  try {
    const { rows } = await db.query(
      "SELECT COUNT(*) FROM item_list WHERE list_id = $1 AND item_id = $2",
      [id, item_id]
    );
    if (rows[0].count > 0) {
      res.status(409).json("The item is already in the list.");
    } else {
      await db.query(
        "INSERT INTO item_list (list_id, item_id) VALUES ($1, $2)",
        [id, item_id]
      );
      res.status(200).json("The item was added to the list successfully.");
    }
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while adding the item to the list.",
      });
    };
  }
});

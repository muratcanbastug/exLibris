const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all shelves
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM shelf");
  res.status(200).json(rows);
});

// Add new shelf
router.post("/", async (req, res) => {
  const { shelf_code } = req.body;
  try {
    const { rows } = await db.query(
      "SELECT 1 FROM shelf WHERE shelf_code = $1",
      [shelf_code]
    );
    if (rows[0]) {
      res.status(409).json({
        error: `The shelf with the given shelf_code already exists`,
      });
    } else {
      await db.query("CALL add_shelf($1::VARCHAR)", [shelf_code]);
      res
        .status(200)
        .json("The shelf with the given shelf_code was added successfully.");
    }
  } catch {
    (err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the shelf." });
    };
  }
});

// Delete a shelf
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("CALL delete_shelf($1::INTEGER)", [id]);
    res.status(200).json("The delete was successful.");
  } catch {
    (err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the shelf." });
    };
  }
  res.status(409).json("There are items in the shelf.");
});

const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all branches with their shelves
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM branch_shelf");
  res.status(200).json(rows);
});

// Delete branch
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("CALL delete_branch($1::INTEGER)", [id]);
    res.status(200).json("The delete was successful.");
  } catch {
    (err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the branch." });
    };
  }
  res.status(409).json("There are items in the branch.");
});

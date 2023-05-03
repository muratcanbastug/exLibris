const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

// Get all rentals at that time
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM all_current_rentals");
  res.status(200).json(rows);
});

// Add rental
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, admin_id } = req.body;

  try {
    await db.query("CALL add_rental($1::INTEGER, $2::INTEGER, $3::INTEGER)", [
      id,
      user_id,
      admin_id,
    ]);
    res.status(200).json({ message: "Rental added successfully" });
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "An error occurred while adding rental" });
    };
  }
  res
    .status(409)
    .json({ message: "Item is not available or user has max item." });
});

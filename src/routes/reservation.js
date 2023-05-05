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

// Add reservation
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    await db.query("CALL add_reservation($1::INTEGER, $2::INTEGER)", [
      id,
      user_id,
    ]);
    res.status(200).json({ message: "Reservation added successfully" });
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "An error occurred while adding reservation" });
    };
  }
  res
    .status(409)
    .json({
      message:
        "Item is available to rent or already reserved or user has max item.",
    });
// Delete reservation
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    await db.query("CALL delete_reservation($1::INTEGER, $2::INTEGER)", [
      id,
      user_id,
    ]);
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "An error occurred while deleting reservation" });
    };
  }
  res.status(409).json({
    message:
      "Item is available to rent or already reserved or user has max item.",
  });
});

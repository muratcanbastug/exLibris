const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../security/authMiddlware");

// Get all rentals at that time
router.get("/", adminAuthMiddleware, async (req, res) => {
  const { rows } = await db.query("SELECT * FROM all_current_rentals");
  res.status(200).json(rows);
});


// Get the item rental at that time
router.get("/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM all_current_rentals WHERE item_id = $1",
    [id]
  );
  res.status(200).json(rows);
});

// Add rental
router.post("/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const { admin_id } = req.tokenPayload;
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

// Update due date
router.patch("/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const { rows } = await db.query(
      "CALL update_due_date_on_rental($1::INTEGER, $2::INTEGER, $3::Date)",
      [id, user_id, "01-01-2000"]
    );
    res.status(200).json({ due_date: rows[0].p_due_date });
  } catch {
    (err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "An error occurred while updating due date" });
    };
  }
  res.status(409).json({
    message:
      "Maximum extra time request has been reached or record does not exist.",
  });
});

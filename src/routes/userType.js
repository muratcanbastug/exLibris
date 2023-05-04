const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all user types
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM user_type");
  res.status(200).json(rows);
});

// Add new user type
router.post("/", async (req, res) => {
  const {
    type_name,
    max_extratime,
    max_rental,
    max_reservation_day,
    penalty_fee,
    rental_time,
  } = req.body;
  try {
    // Check if user type with the given name already exists
    const { rows } = await db.query(
      "SELECT 1 FROM user_type WHERE type_name = $1::VARCHAR",
      [type_name]
    );
    if (rows[0]) {
      res.status(409).json({
        error: `The user type with the given name already exists`,
      });
    } else {
      const { rows } = await db.query(
        "CALL add_user_type($1::VARCHAR, $2::INTEGER, $3::INTEGER, $4::INTEGER, $5::INTEGER, $6::INTEGER, $7::INTEGER)",
        [
          type_name,
          max_extratime,
          max_rental,
          max_reservation_day,
          penalty_fee,
          rental_time,
          1,
        ]
      );
      res.status(200).json({ user_type_id: rows[0].p_user_type_id });
    }
  } catch {
    (err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the user type." });
    };
  }
});


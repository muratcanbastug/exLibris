const Router = require("express-promise-router");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = new Router();

module.exports = router;

// Ban an user
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { admin_id, report } = req.body;
  try {
    // Check if user with the given id_number is already banned
    const { rows } = await db.query(
      "SELECT banned FROM user_account WHERE user_id = $1",
      [id]
    );

    if (rows[0].banned) {
      // User is already banned
      res.status(409).json({
        error: "User is already banned.",
      });
    } else {
      await db.query(
        "CALL add_banned_user($1::INTEGER, $2::INTEGER, $3::VARCHAR)",
        [id, admin_id, report]
      );
      res.status(200).json({ user_id: id });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while banning the user." });
  }
});

// Get user's all lists
router.get("/:id/lists", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM list WHERE user_id = $1::INTEGER",
    [id]
  );
  res.status(200).json(rows);
});

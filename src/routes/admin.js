const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const bcrypt = require("bcrypt");

module.exports = router;

// Get all branches with their shelves
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM admin");
  res.status(200).json(rows);
});

// Add new admin
router.post("/", async (req, res) => {
  const { first_name, last_name, email, username, password, phone_number } =
    req.body;
  try {
    // Check if admin with the given email already exists
    const { rows: existingRows } = await db.query(
      "SELECT email FROM admin WHERE email = $1::VARCHAR",
      [email]
    );

    if (existingRows.length > 0) {
      // Admin already exists, return their admin name
      res.status(409).json({
        admin_id: existingRows[0].admin_id,
        error: "Admin already exists.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { rows } = await db.query(
        "CALL add_admin($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR, $5::VARCHAR, $6::VARCHAR, $7::INTEGER)",
        [
          first_name,
          last_name,
          email,
          username,
          hashedPassword,
          phone_number,
          1,
        ]
      );
      res.status(200).json({ admin_id: rows[0].p_admin_id });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the admin." });
  }
});

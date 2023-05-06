const Router = require("express-promise-router");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = new Router();
const MAX_LISTS = 20;

module.exports = router;

// Get user information
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM user_account WHERE user_id = $1",
    [id]
  );
  res.status(200).json(rows[0]);
});

// Get all users information
router.get("/", async (req, res) => {
  const { rows } = await db.query(
    "SELECT * FROM user_all_information ORDER BY user_id",
    []
  );
  res.status(200).json(rows);
});

// Add new user
router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    phone_number,
    admin_id,
    id_number,
    banned,
    user_type_id,
  } = req.body;
  try {
    // Check if user with the given id_number already exists
    const { rows: existingRows } = await db.query(
      "SELECT user_id FROM user_account WHERE id_number = $1",
      [id_number]
    );

    if (existingRows.length > 0) {
      // User already exists, return their user_id
      res.status(409).json({
        user_id: existingRows[0].user_id,
        error: "User already exists.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { rows } = await db.query(
        "CALL add_user_account($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR, $5::VARCHAR, $6::VARCHAR, $7::INTEGER, $8::VARCHAR, $9::BOOLEAN, $10::SMALLINT, $11::INTEGER)",
        [
          first_name,
          last_name,
          email,
          username,
          hashedPassword,
          phone_number,
          admin_id,
          id_number,
          banned,
          user_type_id,
          1,
        ]
      );
      res.status(200).json({ user_id: rows[0].p_user_id });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the user account." });
  }
});

// Update user information
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, username, phone_number, user_type_id } =
    req.body;
  try {
    await db.query(
      "CALL update_user_information($1::INTEGER, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR, $5::VARCHAR, $6::VARCHAR, $7::SMALLINT)",
      [id, first_name, last_name, email, username, phone_number, user_type_id]
    );
    res.status(200).json({ result: "User information updated successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("CALL delete_user_account($1::INTEGER)", [id]);
    res.status(200).json({ result: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
  res.status(409).json("User has book.");
});

// Reset user password
router.patch("/:id/reset-password", async (req, res) => {
  const { id } = req.params;
  const { new_password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await db.query(
      "UPDATE user_account SET password = $1::VARCHAR WHERE user_id = $2::INTEGER",
      [hashedPassword, id]
    );
    res.status(200).json({ result: "User password updated successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the password." });
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

// Add new list
router.post("/:id/lists", async (req, res) => {
  const { id } = req.params;
  const { list_name } = req.body;
  try {
    // Check if user with the given id_number already have MAX_LISTS list
    const { rows } = await db.query(
      "SELECT COUNT(*) FROM list WHERE user_id = $1::INTEGER",
      [id]
    );
    if (rows[0].count > MAX_LISTS) {
      res.status(409).json({
        error: `The user with the given id_number already has ${MAX_LISTS} list`,
      });
    } else {
      await db.query(
        "INSERT INTO list (user_id, list_name) VALUES ($1::INTEGER, $2::VARCHAR)",
        [id, list_name]
      );
      res.status(200).json("List has been created.");
    }
  } catch {
    (err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while edding the list." });
    };
  }
});

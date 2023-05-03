const Router = require("express-promise-router");
const bcrypt = require("bcrypt");
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

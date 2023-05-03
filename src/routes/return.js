const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all return records
router.get("/", async (req, res) => {
  const { rows } = await db.query(
    "SELECT * FROM return_history ORDER BY return_date"
  );
  res.status(200).json(rows);
});

// Finish the rental process and add the record to rental history
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    await db.query("CALL add_return_history ($1, $2::VARCHAR)", [
      id,
      description,
    ]);
    res.status(200).json("The return history was successfully added.");
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occured while adding rental history.");
    };
  }
  res.status(409).json("Record does not exist.");
});

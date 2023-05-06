const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Get all items
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM item_search");
  res.status(200).json(rows);
});

// Get all avaliable items
router.get("/avaliables", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM avaliable_items");
  res.status(200).json(rows);
});

// Get the item
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM item_search WHERE item_id = $1",
    [id]
  );
  res.status(200).json(rows);
});

// Add multimedia item
router.post("/multimedia", async (req, res) => {
  const {
    item_name,
    publication_date,
    publisher_name,
    language_name,
    branch_id,
    admin_id,
    barcode,
    size,
    serie_name,
    genre_id,
    status,
  } = req.body;
  try {
    const { rows } = await db.query(
      "CALL add_multimedia_item($1::VARCHAR, $2::DATE, $3::VARCHAR, $4::VARCHAR, $5::INTEGER, $6::INTEGER, $7::VARCHAR, $8::INTEGER, $9::VARCHAR, $10::INTEGER, $11::VARCHAR, $12::INTEGER)",
      [
        item_name,
        publication_date,
        publisher_name,
        language_name,
        branch_id,
        admin_id,
        barcode,
        size,
        serie_name,
        genre_id,
        status,
        1,
      ]
    );
    res.status(200).json({ item_id: rows[0].p_item_id });
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while adding item");
    };
  }
});

// Add periodical item
router.post("/periodical", async (req, res) => {
  const {
    item_name,
    publication_date,
    publisher_name,
    language_name,
    branch_id,
    admin_id,
    barcode,
    frequency,
    volume_number,
    seri_name,
    genre_id,
    living,
    status,
  } = req.body;
  try {
    const { rows } = await db.query(
      "CALL add_periodical_item($1::VARCHAR, $2::DATE, $3::VARCHAR, $4::VARCHAR, $5::INTEGER, $6::INTEGER, $7::VARCHAR, $8::VARCHAR, $9::INTEGER, $10::VARCHAR, $11::INTEGER, $12::BOOLEAN, $13::VARCHAR, $14::INTEGER)",
      [
        item_name,
        publication_date,
        publisher_name,
        language_name,
        branch_id,
        admin_id,
        barcode,
        frequency,
        volume_number,
        seri_name,
        genre_id,
        living,
        status,
        1,
      ]
    );
    res.status(200).json({ item_id: rows[0].p_item_id });
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while adding item");
    };
  }
});

// Add non-periodical item
router.post("/nonperiodical", async (req, res) => {
  const {
    item_name,
    publication_date,
    publisher_name,
    language_name,
    branch_id,
    admin_id,
    barcode,
    seri_name,
    genre_id,
    status,
    author_first_name,
    author_last_name,
    author_nationality,
    isbn,
    edition,
    page_number,
  } = req.body;
  try {
    const { rows } = await db.query(
      "CALL add_nonperiodical_item($1::VARCHAR, $2::DATE, $3::VARCHAR, $4::VARCHAR, $5::INTEGER, $6::INTEGER, $7::VARCHAR, $8::VARCHAR, $9::INTEGER, $10::VARCHAR, $11::VARCHAR, $12::VARCHAR, $13::VARCHAR, $14::INTEGER, $15::INTEGER, $16::INTEGER, $17:: INTEGER)",
      [
        item_name,
        publication_date,
        publisher_name,
        language_name,
        branch_id,
        admin_id,
        barcode,
        seri_name,
        genre_id,
        status,
        author_first_name,
        author_last_name,
        author_nationality,
        isbn,
        edition,
        page_number,
        1,
      ]
    );
    res.status(200).json({ item_id: rows[0].p_item_id });
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while adding item");
    };
  }
});

// Delete the item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("CALL delete_item($1)", [id]);
    res.status(200).json("The item was successfully deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occurred while deleting item");
  }
});

// Get the item rate
router.get("/:id/rate", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT rate FROM item WHERE item_id = $1", [
    id,
  ]);
  res.status(200).json(rows[0].rate);
});

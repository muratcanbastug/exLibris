const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../security/authMiddlware");

module.exports = router;

// Get all items
router.get("/", authMiddleware, async (req, res) => {
  const { rows } = await db.query("SELECT * FROM item_search");
  res.status(200).json(rows);
});

// Get all avaliable items
router.get("/avaliables", authMiddleware, async (req, res) => {
  const { rows } = await db.query("SELECT * FROM avaliable_items");
  res.status(200).json(rows);
});

// Get all lost items
router.get("/lost", adminAuthMiddleware, async (req, res) => {
  const { rows } = await db.query("SELECT * FROM all_lost_items");
  res.status(200).json(rows);
});

// Add lost item
router.post("/lost/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { admin_id } = req.tokenPayload;
  try {
    await db.query(
      "CALL add_lost_item($1, $2)",
      [id, admin_id],
      req.tokenPayload.admin_id,
      true
    );
    res.status(200).json("The lost item was added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occured while adding the lost item.");
  }
});

// Delete lost item
router.delete("/lost/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      "CALL delete_lost_item($1)",
      [id],
      req.tokenPayload.admin_id,
      true
    );
    res.status(200).json("The lost item was deleted successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occured while deleting the lost item.");
  }
});

// Get all maintenance items history
router.get("/maintenance/history", adminAuthMiddleware, async (req, res) => {
  const { rows } = await db.query(
    "SELECT * FROM all_maintenance_history_items"
  );
  res.status(200).json(rows);
});

// Get all current maintenance items
router.get("/maintenance/current", adminAuthMiddleware, async (req, res) => {
  const { rows } = await db.query("SELECT * FROM all_maintenance_log_items");
  res.status(200).json(rows);
});

// Add maintenance process
router.post(
  "/maintenance/current/:id",
  adminAuthMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const { admin_id } = req.tokenPayload;

    try {
      await db.query(
        "CALL add_maintenance_log($1, $2, $3::TEXT)",
        [id, admin_id, description],
        req.tokenPayload.admin_id,
        true
      );
      res.status(200).json("Maintenance process created successfully.");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json("An error occurred while adding maintenance process.");
    }
    res
      .status(409)
      .json(
        "Item is not available. Update item status first to start maintenance process."
      );
  }
);

// Add maintenance history
router.post(
  "/maintenance/history/:id",
  adminAuthMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { admin_id } = req.tokenPayload;
    try {
      await db.query(
        "CALL add_maintenance_history($1, $2)",
        [id, admin_id],
        req.tokenPayload.admin_id,
        true
      );
      res.status(200).json("Maintenance history added successfully.");
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json("An error occurred while adding maintenance history.");
    }
  }
);

// Get the item
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (req.tokenPayload.admin) {
    const { rows } = await db.query(
      "SELECT * FROM item_search WHERE item_id = $1",
      [id]
    );
    res.status(200).json(rows);
  } else {
    const { rows } = await db.query(
      "SELECT * FROM item_search WHERE item_id = $1",
      [id],
      req.tokenPayload.user_id,
      false,
      true
    );
    res.status(200).json(rows);
  }
});

// Add multimedia item
router.post("/multimedia", adminAuthMiddleware, async (req, res) => {
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
      ],
      req.tokenPayload.admin_id,
      true
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
router.post("/periodical", adminAuthMiddleware, async (req, res) => {
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
      ],
      req.tokenPayload.admin_id,
      true
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
router.post("/nonperiodical", adminAuthMiddleware, async (req, res) => {
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
      ],
      req.tokenPayload.admin_id,
      true
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
router.delete("/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      "CALL delete_item($1)",
      [id],
      req.tokenPayload.admin_id,
      true
    );
    res.status(200).json("The item was successfully deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occurred while deleting item");
  }
});

// Get the item rate
router.get("/:id/rate", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT rate FROM item WHERE item_id = $1", [
    id,
  ]);
  res.status(200).json(rows[0].rate);
});

// Rate the item
router.post("/:id/rate", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const { user_id } = req.tokenPayload;
  if (user_id === undefined) {
    return res.status(404).json({ message: "Invalid Token" });
  }
  try {
    await db.query(
      "CALL add_rate ($1, $2, $3)",
      [id, user_id, rate],
      user_id,
      false
    );
    res.status(200).json("Rate was added successfully.");
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while adding the rate.");
    };
  }
  res.status(400).json("The user is not allowed to rate this item.");
});

// Upgrade the rate
router.patch("/:id/rate", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const { user_id } = req.tokenPayload;
  if (user_id === undefined) {
    return res.status(404).json({ message: "Invalid Token" });
  }
  try {
    await db.query(
      "CALL update_rate ($1, $2, $3)",
      [rate, user_id, id],
      user_id,
      false
    );
    res.status(200).json("Rate was upgraded successfully.");
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while upgrading the rate.");
    };
  }
});

// Update multimedia item
router.patch("/:id/multimedia", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    item_name,
    publication_date,
    publisher_name,
    language_name,
    branch_id,
    barcode,
    size,
    serie_name,
    genre_id,
  } = req.body;
  try {
    const { rows } = await db.query(
      "CALL update_multimedia_item_information($1::INTEGER, $2::VARCHAR, $3::DATE, $4::VARCHAR, $5::VARCHAR, $6::INTEGER, $7::VARCHAR, $8::VARCHAR, $9::INTEGER, $10::INTEGER)",
      [
        id,
        item_name,
        publication_date,
        publisher_name,
        language_name,
        branch_id,
        barcode,
        serie_name,
        genre_id,
        size,
      ],
      tokenPayload.admin_id,
      true
    );
    res.status(200).json("The item was successfully updated.");
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while updating item");
    };
  }
});

// Update periodical item
router.patch("/:id/periodical", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    item_name,
    publication_date,
    publisher_name,
    language_name,
    branch_id,
    barcode,
    frequency,
    volume_number,
    seri_name,
    genre_id,
    living,
  } = req.body;
  try {
    const { rows } = await db.query(
      "CALL update_periodical_item_information($1::INTEGER, $2::VARCHAR, $3::DATE, $4::VARCHAR, $5::VARCHAR, $6::INTEGER, $7::VARCHAR, $8::VARCHAR, $9::INTEGER, $10::VARCHAR, $11::INTEGER, $12::BOOLEAN)",
      [
        id,
        item_name,
        publication_date,
        publisher_name,
        language_name,
        branch_id,
        barcode,
        frequency,
        volume_number,
        seri_name,
        genre_id,
        living,
      ],
      tokenPayload.admin_id,
      true
    );
    res.status(200).json("The item was successfully updated.");
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while updating item");
    };
  }
});

// Update non-periodical item
router.patch("/:id/nonperiodical", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    item_name,
    publication_date,
    publisher_name,
    language_name,
    branch_id,
    barcode,
    seri_name,
    genre_id,
    author_first_name,
    author_last_name,
    author_nationality,
    isbn,
    edition,
    page_number,
  } = req.body;
  try {
    const { rows } = await db.query(
      "CALL update_nonperiodical_item_information($1::INTEGER, $2::VARCHAR, $3::DATE, $4::VARCHAR, $5::VARCHAR, $6::INTEGER, $7::VARCHAR, $8::VARCHAR, $9::INTEGER, $10::VARCHAR, $11::VARCHAR, $12::VARCHAR, $13::INTEGER, $14::INTEGER, $15::INTEGER)",
      [
        id,
        item_name,
        publication_date,
        publisher_name,
        language_name,
        branch_id,
        barcode,
        seri_name,
        genre_id,
        author_first_name,
        author_last_name,
        author_nationality,
        isbn,
        edition,
        page_number,
      ],
      tokenPayload.admin_id,
      true
    );
    res.status(200).json("The item was successfully updated.");
  } catch {
    (err) => {
      console.error(err);
      res.status(500).json("An error occurred while updating item");
    };
  }
});

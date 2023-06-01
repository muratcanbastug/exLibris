const Router = require("express-promise-router");
const db = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const router = new Router();
module.exports = router;

//Logout
router.post("/", async (req, res) => {
  try {
    const { refreshToken } = req.params.refreshToken;
    await db.query("DELETE FROM refresh_tokens WHERE token = $1::VARCHAR", [
      refreshToken,
    ]);
    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while logging out." });
  }
});
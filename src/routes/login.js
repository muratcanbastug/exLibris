const Router = require("express-promise-router");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = new Router();
module.exports = router;

// Login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows: existingRows } = await db.query(
      "SELECT * FROM admin WHERE email = $1::VARCHAR",
      [email]
    );

    if (existingRows.length > 0) {
      // Admin
      const adminInfo = existingRows[0];
      const isPasswordMatched = await bcrypt.compare(
        password,
        adminInfo.password
      );

      if (isPasswordMatched) {
        // Admin information matches
        const accesToken = jwt.sign(
          { admin_id: adminInfo.admin_id, email: adminInfo.email, admin: true },
          process.env.ACCES_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          { admin_id: adminInfo.user_id, email: adminInfo.email, admin: true },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "30d" }
        );
        const now = Date.now();
        const expirationDate = new Date(now);
        expirationDate.setDate(expirationDate.getDate() + 30);
        const expirationDateTimestamp = expirationDate.getTime();
        await db.query(
          "INSERT INTO refresh_tokens (token, expires_at) VALUES ($1, $2)",
          [refreshToken, expirationDateTimestamp]
        );
        res
          .status(200)
          .json({ accesToken: accesToken, refreshToken: refreshToken });
      } else {
        res.status(401).json({ message: "Invalid Access Token" });
      }
    } else {
      const { rows: existingRows } = await db.query(
        "SELECT * FROM user_account WHERE email = $1::VARCHAR",
        [email]
      );

      if (existingRows.length > 0) {
        // User
        const userInfo = existingRows[0];
        const isPasswordMatched = await bcrypt.compare(
          password,
          userInfo.password
        );

        if (isPasswordMatched) {
          // User information matches
          const accesToken = jwt.sign(
            { user_id: userInfo.user_id, email: userInfo.email, admin: false },
            process.env.ACCES_TOKEN_SECRET,
            { expiresIn: "15m" }
          );

          const refreshToken = jwt.sign(
            { user_id: userInfo.user_id, email: userInfo.email, admin: false },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "30d" }
          );
          const now = Date.now();
          const expirationDate = new Date(now);
          expirationDate.setDate(expirationDate.getDate() + 30);
          const expirationDateTimestamp = expirationDate.getTime();
          await db.query(
            "INSERT INTO refresh_tokens (token, expires_at) VALUES ($1, $2)",
            [refreshToken, expirationDateTimestamp]
          );
          res
            .status(200)
            .json({ accesToken: accesToken, refreshToken: refreshToken });
        } else {
          res.status(401).json({ message: "Invalid Access Token" });
        }
      } else {
        // There is no account for the given email and password
        return res.status(401).json({
          message: "There is no account for the given email and password.",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while loging." });
  }
});


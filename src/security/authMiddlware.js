const jwt = require("jsonwebtoken");

export const authMiddleware = (req, res, next) => {
  const token = req.headers[authorization]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
    req.tokenPayload = payload;
    next();
  });
};

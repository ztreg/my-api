const express = require("express");
const app = express(); // <-- this line MUST come before using app

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// 🔐 Auth middleware
app.use("/api", (req, res, next) => {
  const userKey = req.header("api_key");
  const serverKey = process.env.API_KEY;

  if (userKey && userKey === serverKey) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// ✅ Protected route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Authenticated hello!" });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

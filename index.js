app.use("/api", (req, res, next) => {
    const userKey = req.header("api_key");
    const serverKey = process.env.API_KEY;
  
    if (userKey && userKey === serverKey) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });
  
  app.get("/api/hello", (req, res) => {
    res.json({ message: "Secret hello, authenticated user!" });
  });
  
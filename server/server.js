const express = require("express");
const app = express();
const PORT = 5000;

app.get("/api", (req, res) => {
  res.json({ test: "sever works well" });
});

app.listen(PORT, () => {
  console.log(`sever started on port ${PORT}`);
});

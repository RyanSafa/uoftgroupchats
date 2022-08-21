const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");

const ErrorHandler = require("./middleware/errorHandling");
const courseRoutes = require("./routes/courses");
const groupchatRoutes = require("./routes/groupchats");
const reportRoutes = require("./routes/reports");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.set("trust proxy", 1);

app.use("/api/courses", courseRoutes);
app.use("/api/groupchats", groupchatRoutes);
app.use("/api/reports", reportRoutes);

app.use("/*", (req, res, next) => {
  next({ status: 404, message: "Page not found." });
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`sever started on port ${PORT}`);
});

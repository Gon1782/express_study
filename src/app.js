require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(5000);

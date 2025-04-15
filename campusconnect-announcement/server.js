const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:8000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api", require("./announcement/route"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

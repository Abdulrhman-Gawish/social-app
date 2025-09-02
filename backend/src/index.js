const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("<h1>Hello From Egypt!</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

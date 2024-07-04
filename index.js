const express = require("express");

const AppRouter = require("./index.Router.js");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());

AppRouter(app);

// Set up server to listen on specified port (default to 3000)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 404 route
app.use("*", (req, res) => {
  res.status(404).json({ Msg: "I Can't Found" });
});

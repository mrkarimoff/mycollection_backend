const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const dbConnection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const collectionRoutes = require("./routes/collections");

// database connection
dbConnection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", collectionRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello user</h1>");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/authmiddleware");
require("dotenv").config();

const app = express();

// ✅ THIS MUST BE HERE (BEFORE ROUTES)
app.use(express.json());
app.use(cors());

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ ROUTES AFTER middleware
app.use("/api/auth", require("./routes/auth"));


app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "Access granted",
    user: req.user
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server running"));
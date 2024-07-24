const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const authRoutes = require("./authRoutes");
const spotifyRoutes = require("./spotifyRoutes");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

router.use("/auth", authRoutes);
router.use("/spotify", isAuth, spotifyRoutes);

module.exports = router;
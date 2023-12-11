const express = require("express");
const db = require("../database");
const router = express.Router();
router.get("/", async (req, res) => {
  const data = await db.promise().query(`select 'yes'`);
  let working = "";
  if ((data[0].yes = "yes")) {
    res.send({ working: true });
  }
});

module.exports = router;

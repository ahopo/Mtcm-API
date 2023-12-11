const express = require("express");
require("dotenv").config();
const {
  GetAllByView,
  Create,
  GetAllByQuery,
  Delete,
  Update,
} = require("../controllers/deals.js");
const router = express.Router();
// GET ALL Customer
router.get("/", GetAllByView);
router.post("/", Create);
router.get("/q/:d", GetAllByQuery);
router.delete("/:id", Delete);
router.patch("/:id", Update);
module.exports = router;

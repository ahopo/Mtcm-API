const express = require("express");
require("dotenv").config();
const {
  GetAllMemPark,
  GetAllTemp,
  GetByTempID,
  GetByParkID,
  GetAllByQuery,
} = require("../controllers/customview.js");
const router = express.Router();

// GET ALL TEMPLATE DATA
router.get("/t", GetAllTemp);
// GET ALL MEMORIAL PARK
router.get("/p", GetAllMemPark);
// GET TEMPLATE
router.get("/t/:id", GetByTempID);
router.get("/p/:id", GetByParkID);
router.get("/t/q/:d", GetAllByQuery);
module.exports = router;

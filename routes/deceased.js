const express = require("express");
require("dotenv").config();
const {
  Create,
  GetAllByView,
  Delete,
  Update,
  GetByID,GetAllByQuery
} = require("../controllers/deceased.js");
const router = express.Router();
// GET ALL Customer
router.get("/", GetAllByView);
// GET CUSTOMER
router.get("/:id", GetByID);
// ADD NEW Customer
router.post("/", Create);

// DELETE Customer
router.delete("/:id", Delete);
// UPDATE Customer
router.patch("/:id", Update);
router.get("/q/:d", GetAllByQuery);
module.exports = router;

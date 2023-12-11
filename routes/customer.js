const express = require("express");
require("dotenv").config();
const {
  Create,
  GetAllByView,
  Delete,
  Update,
  GetByID,
} = require("../controllers/customer.js");
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

module.exports = router;

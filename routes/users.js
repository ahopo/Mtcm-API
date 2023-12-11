const express = require("express");
require("dotenv").config();
const {
  Create,
  GetAllByView,
  Delete,
  Update,
  GetByID,
  GetID,
  GetAllByQuery,
} = require("../controllers/users.js");
const router = express.Router();

// GET ALL Customer
router.get("/", GetAllByView);
// GET Customer by ID
router.get("/id", GetID);
router.get("/:id", GetByID);
router.post("/", Create);
router.get("/q/:d", GetAllByQuery);
// DELETE Customer
router.delete("/:id", Delete);
// UPDATE Customer
router.patch("/:id", Update);

module.exports = router;

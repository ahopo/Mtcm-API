const express = require("express");
require("dotenv").config();
const { GetAll, GetAllByQuery } = require("../controllers/roles.js");

const router = express.Router();

// GET ALL Customer
router.get("/", GetAll);
router.get("/q/:d", GetAllByQuery);
module.exports = router;

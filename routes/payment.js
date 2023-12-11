const express = require("express");
require("dotenv").config();
const {
    Create,
    GetAll,
    Delete,
    Update,
    GetAllByQuery
  } =require( "../controllers/payment.js");


  const router = express.Router();

  // GET ALL Customer
  router.get("/", GetAll);
  // ADD NEW Customer
  router.post("/", Create);
  // DELETE Customer
  router.delete("/:id", Delete);
  // UPDATE Customer
  router.patch("/:id", Update);
  router.get("/q/:d", GetAllByQuery);
  module.exports=router;
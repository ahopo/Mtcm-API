const express = require("express");
require("dotenv").config();
const {
    Create,
    GetAll,
    Delete,
    Update,
  } =require( "../controllers/installment.js");


  const router = express.Router();

  // GET ALL Customer
  router.get("/", GetAll);
  // ADD NEW Customer
  router.post("/", Create);
  // DELETE Customer
  router.delete("/:id", Delete);
  // UPDATE Customer
  router.patch("/:id", Update);

  module.exports=router;
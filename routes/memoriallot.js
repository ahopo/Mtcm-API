const express = require("express");
require("dotenv").config();
const {
    Create,
    GetAllByView,
    GetByID,
    Delete,
    Update,
    GetAllByQuery,
    TABLE,
  } =require( "../controllers/memoriallot.js");
  const router = express.Router();
  TABLE.main=process.env.MEMORIALLOTS;
  TABLE.view=process.env.MEMORIALLOTSVIEW;
  // GET ALL Customer
  router.get("/", GetAllByView);
  // GET Customer by ID
  router.get("/:id", GetByID);
// GET Customer by Query
  router.get("/q/:d", GetAllByQuery);
  // ADD NEW Customer
  router.post("/", Create);

  // DELETE Customer
  router.delete("/:id", Delete);
  // UPDATE Customer
  router.patch("/:id", Update);



  module.exports=router;
const db = require("../database");
require("dotenv").config();
const {
  insertString,
  deleteString,
  updateString,
  selectAllString,
} = require("./helper");
const TABLE = {
  main: process.env.GROUPS,
  view: process.env.GROURPVIEW,
};

const GetAll = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.view));

  res.send(data[0]);
};
const GetAllByView = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.view));

  res.send(data[0]);
};

const GetByID = (req, res) => {
  const { id } = req.params;
  res.send(id);
};

const Create = (req, res) => {
  db.promise()
    .query(insertString(TABLE.main, req.body))
    .then((result) => {
      res.status(201).send({ msg: "Successfully Created", res: result });
      console.table("Successfully Created");
    })
    .catch((err) =>
      res.status(500).send({
        msg: "Please check the inputted data.",
        errormessage: err.message,
      })
    );
};

const Delete = (req, res) => {
  db.promise()
    .query(deleteString(TABLE.main, req.params.id))
    .then((data) => {
      res.status(202).send({ msg: "Sucessfully Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Unable to Delete", error: err });
    });
};

const Update = (req, res) => {
  db.promise()
    .query(updateString(TABLE.main, req.body, req.params.id))
    .then((result) => {
      res.status(202).send({ msg: "Successfully Updated" });
      console.log("Successfully updated");
    })
    .catch((error) => {
      res.status(400).send({ msg: "Please check the requested information" });
      console.log(error);
    });
};

module.exports = {
  GetAll,
  GetAllByView,
  Create,
  Delete,
  Update,
  GetByID,
  TABLE,
};

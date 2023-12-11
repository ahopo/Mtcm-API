const db = require("../database");
require("dotenv").config();
const {
  insertString,
  deleteString,
  updateString,
  selectAllString,
  selectByQueryString,
} = require("./helper");
const TABLE = {
  main: process.env.PAYMENT,
  view: process.env.PAYMENTVIEW,
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
  console.log(insertString(TABLE.main, req.body));
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
  console.log(updateString(TABLE.main, req.body, req.params.id));
  db.promise()
    .query(updateString(TABLE.main, req.body, req.params.id))
    .then((result) => {
      res.status(202).send({ msg: "Successfully Updated" });
      console.log("Successfully updated");
    })
    .catch((error) => {
      res
        .status(400)
        .send({ msg: "Please check the requested information", error: error });
      console.log(error);
    });
};
const GetAllByQuery = async (req, res) => {
  let { d } = req.params;
  let query = {};
  params = d.split("-");
  for (i in params) {
    query[i] = params[i];
  }

  const data = await db.promise().query(selectByQueryString(TABLE.view, query));
  res.send(data[0]);
};

module.exports = {
  GetAll,
  GetAllByView,
  Create,
  Delete,
  Update,
  GetByID,
  GetAllByQuery,
  TABLE,
};

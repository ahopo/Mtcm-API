const db = require("../database");
require("dotenv").config();
const {
  selectAllString,
  insertString,
  deleteString,
  selectByQueryString,
  updateString,
} = require("./helper");
const TABLE = {
  view: process.env.DEALSVIEW,
  main: process.env.DEALS,
};

const GetAllByView = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.view));
  res.send(data[0]);
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
9;

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

module.exports = {
  GetAllByView,
  Create,
  GetAllByQuery,
  Delete,
  Update,
};

const db = require("../database");
require("dotenv").config();
const {
  insertString,
  deleteString,
  updateString,
  selectAllString,
  selectByIdString,
  selectAuthString,
  selectByQueryString,
} = require("./helper");
const TABLE = {
  main: process.env.USERS,
  view: process.env.USERSVIEW,
};
const GetAll = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.main));

  res.send(data[0]);
};
const GetAllByView = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.view));

  res.send(data[0]);
};

const GetByID = async (req, res) => {
  const data = await db
    .promise()
    .query(selectByIdString(TABLE.view, req.params.id));
  res.send(data[0]);
};

const GetID = async (req, res) => {
  let { username, password } = req.query;
  const data = await db
    .promise()
    .query(selectAuthString(TABLE.view, username, password));
  res.send(data[0]);
};

const Create = (req, res) => {
  db.promise()
    .query(insertString(TABLE.main, req.body))
    .then((result) => {
      res.status(201).send({ msg: "Successfully Created", res: result });
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
    })
    .catch((error) => {
      res
        .status(400)
        .send({ msg: "Please check the requested information", err: error });
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
  GetID,
  GetAllByQuery,
};

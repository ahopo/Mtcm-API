const db = require("../database");
require("dotenv").config();
const {
  insertString,
  deletePhysicalString,
  updateString,
  selectAllString,
  selectByQueryString,
} = require("./helper");
const TABLE = {
  main: process.env.LOGS,
  view: process.env.LOGSVIEW,
};

const GetAll = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.view));

  res.send(data[0]);
};

const Create = (req, res) => {
  db.promise()
    .query(insertString(TABLE.main, req.body))
    .then((result) => {
      res.status(201).send({ msg: "Successfully Created", res: result });
      console.table("Successfully Created", result);
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
    .query(deletePhysicalString(TABLE.main, req.params.id))
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
const GetAllByQuery = async (req, res) => {
  let { d } = req.params;
  let query = {};
  params = d.split("-");
  for (i in params) {
    query[i] = params[i];
  }
  console.log(selectByQueryString(TABLE.view, query));
  const data = await db.promise().query(selectByQueryString(TABLE.view, query));
  res.send(data[0]);
};

module.exports = {
  GetAll,
  Create,
  Delete,
  Update,
  TABLE,
  GetAllByQuery,
};

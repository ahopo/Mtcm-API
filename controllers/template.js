const db = require("../database");
require("dotenv").config();
const fs = require("fs");
const {
  insertString,
  updateString,
  selectAllString,
  selectByQueryString,
  selectByIdString,
  deletePhysicalString,
} = require("./helper");
const TABLE = {
  main: process.env.TEMPLATE,
  view: process.env._TEMPLATEVIEW,
};

const GetAll = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.main));

  res.send(data[0]);
};
const GetAllByView = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.view));

  res.send(data[0]);
};
const GetAllByQuery = async (req, res) => {
  let { d } = req.params;
  let query = {};
  params = d.split("-");
  for (i in params) {
    query[i] = params[i];
  }

  const data = await db.promise().query(selectByQueryString(TABLE.main, query));
  res.send(data[0]);
};

const GetByID = async (req, res) => {
  let base64 = "";
  let filename = "";
  const data = await db
    .promise()
    .query(selectByIdString(TABLE.main, req.params.id));

  filename = data[0][0]["name"];
  base64 = data[0][0]["file"];
  let base64Image = base64.split(";base64,").pop();
  fs.writeFile(
    `upload/${filename}`,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created", err);
    }
  );
  data[0][0]["path"] = `${process.cwd()}/upload/${filename}`;
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
  if (Object.keys(req.body).length === 0) {
    res.status(202).send({ msg: "No data has been changed" });
    console.log("No data has been changed");
  } else {
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
  }
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

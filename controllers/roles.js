const db = require("../database");
require("dotenv").config();
const { selectAllString, selectByQueryString } = require("./helper");
const TABLE = {
  main: process.env.ROLES,
  view: process.env.ROLESVIEW,
};

const GetAll = async (req, res) => {
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

  const data = await db.promise().query(selectByQueryString(TABLE.view, query));
  res.send(data[0]);
};

module.exports = {
  GetAll,
  GetAllByQuery,
};

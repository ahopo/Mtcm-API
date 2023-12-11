const db = require("../database");
require("dotenv").config();
const date = require("date-and-time");
const converter = require("number-to-words-en");
const {
  selectAllString,
  selectByIdString,
  selectByQueryString,
} = require("./helper");
const TABLE = {
  parkview: process.env.PARKVIEW,
  templateview: process.env.TEMPLATEVIEW,
};
const GetAllMemPark = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.parkview));

  res.send(data[0]);
};
const GetAllTemp = async (req, res) => {
  const data = await db.promise().query(selectAllString(TABLE.templateview));
  for (let d in data[0]) {
    data[0][d]["pricetext"] = converter
      .toWords(data[0][d]["price"])
      .toUpperCase();
    data[0][d]["paymenttext"] = converter
      .toWords(data[0][d]["payment"])
      .toUpperCase();
    data[0][d]["constructionpaymenttext"] = converter
      .toWords(data[0][d]["constructionpayment"])
      .toUpperCase();
    data[0][d]["miscellaneouspaymenttext"] = converter
      .toWords(data[0][d]["miscellaneouspayment"])
      .toUpperCase();
    const now = new Date();
    const pattern = date.compile("dddd, MMMM DD YYYY");
    data[0][d]["currentTextDate"] = date.format(now, pattern);
    const pattern2 = date.compile("YYYY/MM/DD HH:mm:ss");
    data[0][d]["currentNumberDate"] = date.format(now, pattern2);
    data[0][d]["currentTextMonth"] = date.format(now, "MMMM");
    data[0][d]["currentNumberMonth"] = date.format(now, "MM");
    data[0][d]["currentNumberYear"] = date.format(now, "YYYY");
    data[0][d]["currentTextDay"] = date.format(now, "dddd");
    data[0][d]["currentNumberDay"] = date.format(now, "DD");
    data[0][d]["currentTime"] = date.format(now, "hh:mm:ss A");
    data[0][d]["currentHour"] = date.format(now, "hh A");
    data[0][d]["currentMinute"] = date.format(now, "mm");
    data[0][d]["currentSecond"] = date.format(now, "ss");
  }
  res.send(data[0]);
};

const GetByTempID = async (req, res) => {
  const data = await db
    .promise()
    .query(selectByIdString(TABLE.templateview, req.params.id));
  res.send(data[0]);
};

const GetByParkID = async (req, res) => {
  const data = await db
    .promise()
    .query(selectByIdString(TABLE.parkview, req.params.id));
  res.send(data[0]);
};
const GetAllByQuery = async (req, res) => {
  let { d } = req.params;
  let query = {};
  params = d.split("-");
  for (i in params) {
    query[i] = params[i];
  }
  const data = await db
    .promise()
    .query(selectByQueryString(TABLE.templateview, query));
  res.send(data[0]);
};
module.exports = {
  GetAllMemPark,
  GetAllTemp,
  GetByTempID,
  GetByParkID,
  GetAllByQuery,
};

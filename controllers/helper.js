const insertString = (table, data) => {
  let fields = [];
  let values = [];
  for (i in data) {
    if (typeof data[i] == "boolean") {
      data[i] = data[i] ? 1 : 0;
    }
    fields.push(i);
    if (typeof i == "string" || typeof i == undefined || typeof i == date) {
      values.push("'" + data[i] + "'");
    } else {
      values.push(data[i]);
    }
  }

  return `INSERT INTO ${table} (${fields.join()}) VALUES (${values.join()}) `;
};

const updateString = (table, data, id) => {
  let val = [];
  for (i in data) {
    if (typeof i == "string" || typeof i == undefined || typeof i == date) {
      val.push(i + "='" + data[i] + "'");
    } else {
      val.push(i + "=" + data[i]);
    }
  }
  return `UPDATE ${table} SET ${val.join()} WHERE id="${id}"`;
};

const deleteString = (table, id) => {
  return `update ${table} set is_deleted=1 WHERE id=${id}`;
};
const deletePhysicalString = (table, id) => {
  console.log(`delete from ${table} where id = ${id}`);
  return `delete from ${table} where id = ${id}`;
};
const selectAllString = (table) => {
  return `select distinct * from ${table}`;
};
const selectByIdString = (table, id) => {
  return `select distinct * from ${table} where id=${id}`;
};
const selectAuthString = (table, username, password) => {
  return `select  id from ${table} where username='${username}' and password='${password}'`;
};
const selectByQueryString = (table, query) => {
  let queryparam = [];
  for (i in query) {
    queryparam.push(query[i]);
  }

  return `select distinct * from ${table} where ${queryparam.join(" and ")}`;
};

module.exports = {
  insertString,
  deleteString,
  updateString,
  selectAllString,
  selectByIdString,
  selectAuthString,
  selectByQueryString,
  deletePhysicalString,
};

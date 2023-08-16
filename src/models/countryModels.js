const pool = require("../db/connectionDb").pool;
const format = require("pg-format");

const getCountryModel = async () => { //limit = 5
    SQLquery = {
      text: "SELECT id, name, url FROM tourist",
      //values: [limit],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  };
  
  module.exports = {
    getCountryModel,
  };
  
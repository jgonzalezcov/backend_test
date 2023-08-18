const pool = require("../db/connectionDb").pool;
const format = require("pg-format");

const getTouristModel = async () => { //limit = 5
    SQLquery = {
      text: "SELECT id, name, url, description_short, description_full, lat, lon, country region FROM tourist",
      //values: [limit],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  };
  
  module.exports = {
    getTouristModel,
  };
  
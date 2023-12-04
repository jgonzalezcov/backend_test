const pool = require("../db/connectionDb").pool;
const format = require("pg-format");

const getTopicModel = async () => { //limit = 5
    SQLquery = {
      text: "SELECT id, topic, user_id FROM topic",
      //values: [limit],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  };
  
  module.exports = {
    getTopicModel,
  };
  
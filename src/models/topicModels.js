const { pool, format } = require('../helpers/database')

const getById = async (id) => {
  const query = 'SELECT * FROM question WHERE topic_id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows;
}



const list = async () => {
  const formatQuery = format('SELECT * FROM topic ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}


module.exports = {
  list,
  getById,

}

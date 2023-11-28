const { pool, format } = require('../helpers/database')



const list = async () => {
  const formatQuery = format('SELECT topic, user_id FROM topic ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}


module.exports = {
  list,
}

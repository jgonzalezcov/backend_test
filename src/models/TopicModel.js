const { pool, format } = require('../helpers/database')



const list = async () => {
  const formatQuery = format('SELECT topic, id_user FROM topic ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}


module.exports = {
  list,
}

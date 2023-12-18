const { pool, format } = require('../helpers/database')

const getById = async (id) => {
  const query = 'SELECT * FROM question WHERE topic_id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows;
}



const list = async (account_id) => {
  try {
    const values = [account_id]
    const consulta =
      'SELECT * FROM topic WHERE user_id=$1 ORDER BY id DESC'
    const { rows } = await pool.query(consulta, values)
    return rows
  } catch (error) {
    return 'error'
  }
}
const create = async (topic, description, category,  public, user_id) => {
  try {
    const values = [topic, description, category,  public, user_id]
    const consulta =
      'INSERT INTO topic values (DEFAULT, $1, $2, $3, $4,DEFAULT,DEFAULT, $5)'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}
const update = async (topic, description, category,  public,  user_id, id) => {
  try {
    const values = [topic, description, category,  public, user_id, id]
    const consulta =
      'UPDATE topic set topic=$1, description=$2, category=$3,  public=$4, user_id=$7 WHERE id=$3'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const remove = async (id) => {
  try {
    const values = [id]
    const consulta = 'DELETE from topic WHERE id=$1'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}


const existsTopic = async (id) => {
  try {
    const values = [id]
    const consulta = 'SELECT count(id) as num FROM topic WHERE id = $1'
    resp = await pool.query(consulta, values)
    return resp.rows[0].num
  } catch (error) {
    return 'error'
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  existsTopic,
}

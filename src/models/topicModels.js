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
const create = async (topic , user_id,  category,  public, description) => {
  console.log(topic , user_id,  category,  public, description)
  try {
    const values = [topic , user_id,  category,  public, description]
    const consulta =
      'INSERT INTO topic values (DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT, $5)'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}
const update = async (topic , user_id,  category,  public, description, id) => {

  try {
    const values = [topic , user_id,  category,  public, description, id]
    const consulta =  'UPDATE topic SET topic=$1 , user_id=$2,  category=$3,  public=$4, description=$5 WHERE id=$6'
console.log(consulta) 
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

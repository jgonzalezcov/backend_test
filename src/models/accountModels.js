const { pool, format } = require('../helpers/database')

const getById = async (id) => {
  const query = 'SELECT * FROM account WHERE id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows;
}



const list = async () => {
  const formatQuery = format('SELECT * FROM account ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}
const duplicateAccount = async (email) => {
  try {
    const values = [email]
    const consulta = 'SELECT count(email) as num FROM account WHERE email = $1'
    resp = await pool.query(consulta, values)
 console.log( resp.rows[0].num)
    return resp.rows[0].num
  } catch (error) {

    return 'error'
    
  }
}


const signin = async ({
  email,
  password,
  name,
}) => {
  const query = `INSERT INTO account 
  (email, password, name) 
  VALUES ('%s', '%s', '%s')`
  const formatQuery = format(
    query,
    email,
    password,
    name,
  )
  const { rows } = await pool.query(formatQuery)
  return rows[0]

}

const getByEmail = async (email) => {
  try {
    const query = `SELECT * FROM account WHERE email= '%s' ORDER BY id DESC`
    const formatQuery = format(query, email)
    const { rows } = await pool.query(formatQuery)
    return rows[0]
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  list,
  getById,
  duplicateAccount,
  signin,
  getByEmail,
}

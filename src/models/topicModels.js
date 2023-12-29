const { pool, format } = require('../helpers/database')

const getById = async (id) => {
  const query = 'SELECT * FROM question WHERE topic_id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows;
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

const list = async () => {

 
  const client = await pool.connect();

  try {
    const query = `
    SELECT
    t.id,
    t.topic,
    t.user_id,
    t.description,
    t.category,
    t.public,
    q.id AS question_id,  -- Agrega q.id a la lista de columnas seleccionadas
    q.question,
    jsonb_agg(jsonb_build_object(
      'alternative', a.alternative,
      'isCorrect', a.isCorrect
    )) AS alternatives
  FROM
    topic t
    LEFT JOIN question q ON t.id = q.topic_id
    LEFT JOIN alternative a ON q.id = a.question_id
  GROUP BY
    t.id, t.topic, t.user_id, t.description, t.category, t.public, q.id, q.question  -- Agrega q.id a la lista de columnas en GROUP BY
  ORDER BY
    t.id DESC, q.id;
  
  `;
  

    const result = await client.query(query);
 
    // Formatea los resultados según tu estructura deseada
    const formattedTopics = result.rows.map((row) => {
      return {
        topic: row.topic,
        user_id: row.user_id,
        description: row.description,
        category: row.category,
        public: row.public,
        questions: [
          {
            question: row.question,
            alternatives: row.alternatives,
          },
        ],
      };
    });

    // Agrupa las preguntas para el mismo tema
    const groupedTopics = formattedTopics.reduce((acc, topic) => {
      const existingTopic = acc.find((t) => t.topic === topic.topic);

      if (existingTopic) {
        existingTopic.questions.push(...topic.questions);
      } else {
        acc.push(topic);
      }

      return acc;
    }, []);

    return groupedTopics;
  } catch (error) {
    console.error('Error al obtener temas completos:', error);
    return 'error';
  } finally {
    client.release();  // Libera el cliente después de realizar la consulta
  }
};













    // CREACION FULL DE TEMAS DE ESTUDIOS.

const createFull = async ({ topic, user_id, description, category, public: isPublic, questions }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');  // Comienza la transacción

    // Inserta la información principal en la tabla principal (topic).
    const topicValues = [topic, user_id, category, isPublic, description];
    const topicQuery = 'INSERT INTO topic VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT, $5) RETURNING id';
    const topicResult = await client.query(topicQuery, topicValues);
    const topicId = topicResult.rows[0].id;

    // Inserta las preguntas y respuestas en la tabla de preguntas asociadas al tema (question).
    const questionQuery = 'INSERT INTO question VALUES (DEFAULT, $1, $2) RETURNING id';
    const alternativeQuery = 'INSERT INTO alternative VALUES (DEFAULT, $1, $2, $3)';

    for (const question of questions) {
      const { question: questionText, alternatives } = question;

      const questionValues = [topicId, questionText];
      const questionResult = await client.query(questionQuery, questionValues);
      const questionId = questionResult.rows[0].id;

      // Inserta las alternativas asociadas a la pregunta en la tabla alternative.
      for (const alternative of alternatives) {
        const { alternative: alternativeText, isCorrect } = alternative;
        console.log('Question ID:', questionId, 'Alternative Text:', alternativeText, 'Is Correct:', isCorrect);
        const alternativeValues = [questionId, alternativeText, isCorrect];
        await client.query(alternativeQuery, alternativeValues);
      }
    }

    await client.query('COMMIT');  // Confirma la transacción
    return 'success';  // o podrías devolver algún otro indicador de éxito si lo prefieres
  } catch (error) {
    await client.query('ROLLBACK');  // Revierte la transacción en caso de error
    console.error(error);
    return 'error';
  } finally {
    client.release();  // Libera el cliente de la conexión
  }
};


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
  createFull,

}

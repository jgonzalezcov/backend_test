const { pool, format } = require('../helpers/database')


const getById = async (id) => {
  try {
    const query = `
      SELECT q.id, q.topic_id, q.question, a.id as alternative_id, a.alternative, a.isCorrect
      FROM question q
      LEFT JOIN alternative a ON q.id = a.question_id
      WHERE q.topic_id = $1
      ORDER BY q.id, a.id;`;

    const values = [id];
    const { rows } = await pool.query(query, values);

    const result = rows.reduce((acc, row) => {
      const existingQuestion = acc.find((item) => item.id === row.id);
      if (existingQuestion) {
        if (row.alternative_id) {
          existingQuestion.alternatives.push({
            id: row.alternative_id,
            alternative: row.alternative,
            isCorrect: row.isCorrect,
          });
        }
      } else {
        acc.push({
          id: row.id,
          topic_id: row.topic_id,
          question: row.question,
          alternatives: row.alternative_id
            ? [
                {
                  id: row.alternative_id,
                  alternative: row.alternative,
                  isCorrect: row.iscorrect,
                },
              ]
            : [],
        });
      }
      return acc;
    }, []);

    // Mapeamos cada pregunta y ajustamos isCorrect para que sea false si no hay alternativas correctas
    const randomizedResult = result.map((item) => ({
      ...item,
      alternatives: item.alternatives.map((alt) => ({
        ...alt,
        isCorrect: alt.isCorrect || false,
      })).sort(() => Math.random() - 0.5), // Orden aleatorio
    }));

    return randomizedResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const list = async () => {
  const query = 'SELECT * FROM question ORDER BY id DESC';
  const { rows } = await pool.query(query);
  return rows;
}


module.exports = {
  list,
  getById,
}

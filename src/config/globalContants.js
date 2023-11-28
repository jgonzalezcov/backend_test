// Importa y carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Objeto que contiene las constantes globales para la configuración de la base de datos y el servidor
const globalContants = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  serverPort: process.env.PORT,
};

// Imprime las constantes globales en la consola (esto puede ser útil para depurar)
console.log(globalContants);

// Exporta el objeto con las constantes globales
module.exports = globalContants;

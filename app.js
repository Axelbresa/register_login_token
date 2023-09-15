import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath
import { dirname } from 'path'; // Importa la función dirname

import "dotenv/config.js";

import { sequelize } from "./src/config/db.js";

import userRuta from './src/routes/user.routes.js';
import authRuta from './src/routes/auth.routes.js';
import { environments } from "./src/config/environments.js";
import createLogs from './src/helpers/createLogs.js';
import handleErrors from './src/middleware/handleError.js';

const __filename = fileURLToPath(import.meta.url); // Obtiene el nombre del archivo actual
const __dirname = dirname(__filename); // Obtiene el directorio actual

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  morgan('combined', {
    stream: {
      write: (message) => {
        createLogs(message, __dirname, 'logs');
      },
    },
  })
);


// Configuración
const PORT = environments.PORT || 3100;

// Conectar a la base de datos
sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ force: false });
    console.log("Nos hemos conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Se ha producido un error", error);
  });

 app.get('/', (req, res, next) => {
    try {
      // Código que puede generar un error
       throw new Error(JSON.stringify({ Error: 'Error de prueba', status: 500 }));

       res.send('Hola mundo');
    } catch (err) {
      next(err);
    }
  });
app.use("/api/usuario", userRuta);
app.use("/api/auth", authRuta);

app.use(handleErrors);

// Iniciar el servidor
app.listen(PORT, function (req, res) {
  console.log("La app está escuchando en http://localhost:" + PORT);
});






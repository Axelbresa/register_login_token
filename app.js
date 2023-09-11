import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import "dotenv/config.js"

import {sequelize} from "./src/config/db.js";

import userRuta from './src/routes/user.routes.js';
import authRuta from './src/routes/auth.routes.js';
import { environments } from "./src/config/environments.js";

 const app=express();

 //middlewares
 app.use(cors());
 app.use(morgan("dev"));
 app.use(express.urlencoded({extended:true}));
 
 app.use(helmet({
    contentSecurityPolicy:false
 }));

 //setting
 const PORT=environments.PORT || 3100; 

 //conectamos a la base de datos
 sequelize
 .authenticate()
 .then(async () => {
   await sequelize.sync({ force: false })
   console.log("nos hemos conectado a la base de datos");
 })
 .catch((error) => {
   console.log("se ha producido un error", error);
 });

 app.use("/api/usuario", userRuta);
 app.use("/api/auth", authRuta);

 //arrancamos el servidor
 app.listen(PORT, function (req, res){
    console.log("la app esta escuchando en http://localhost:" + PORT)
 })

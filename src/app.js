import express, { response } from 'express'
import {router} from "./routes/filme.js"
import conectardb from './config/dbConfig.js';
import {routerUsuario} from './routes/usuarios.js'
import morgan from "morgan"

const conexao = await conectardb();
conexao.on("error", (err) => {
    console.log("Erro: " + err);
});

conexao.once("open", () => {
    console.log("Conexao estabelecida com sucesso!")
});

const app = express();
app.use(morgan('dev'))
app.use(express.json())

////////////////
//   ROTAS   //
//////////////
app.use("/filmes", router)
app.use("/usuarios", routerUsuario)

export default app; 

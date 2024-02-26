import express from 'express'
import { buscarTodosFilmes, cadastrarFilme, consultarFilmeId, atualizarFilme, ExcluirFilme, ExcluirFilmeId } from "../controller/filmeController.js"
import { login } from '../middleware/login.js';
import {admin} from "../perfil/admin.js"
const router = express.Router();

 router.get('/', login, buscarTodosFilmes)
//cadastrar filme
 router.post('/register', login , admin, cadastrarFilme)


// consultar filme pelo ID
 router.get("/:id", login, consultarFilmeId);


// atualizar cadastro 
router.put("/", login , admin, atualizarFilme)

// excluir filme
router.delete("/", login , admin, ExcluirFilme)

router.delete("/id", login , admin, ExcluirFilmeId)

export { router };
import express from 'express'
import { buscarTodosUsuarios, cadastrarUsuario, consultarUsuarioId, consultarUsuarioNome, atualizarUsuario, ExcluirUsuario, loginUsuario,cadastrarUsuarioAdmin } from "../controller/usuarioController.js"
import { login } from '../middleware/login.js';
import {admin} from "../perfil/admin.js"
const routerUsuario = express.Router();


///////////////////////////
//Buscar todos os Usuario//
/////////////////////////
routerUsuario.get('/', login, buscarTodosUsuarios)
/////////////////////
//cadastrar usuario//
////////////////////
routerUsuario.post('/', login, admin, cadastrarUsuario)
////////////////////////////
//cadastrar usuario Admin//
//////////////////////////
routerUsuario.post('/admin', login, admin, cadastrarUsuarioAdmin)
///////////////////////////// ////////
// consultar usuario pelo Matricula//
/////////////////////////////////////
routerUsuario.get("/:matricula", login, consultarUsuarioId);
///////////////////////////// ////////
// consultar usuario pelo Matricula//
/////////////////////////////////////
routerUsuario.get("/nome/:nome", login, consultarUsuarioNome)
////////////////////////
// atualizar cadastro //
///////////////////////
routerUsuario.put("/", login, admin, atualizarUsuario)
/////////////////////
// excluir usuario//
///////////////////
routerUsuario.delete("/", login, admin, ExcluirUsuario)
////////////////////
//      Login    //
//////////////////
routerUsuario.post("/login", loginUsuario)

export { routerUsuario };
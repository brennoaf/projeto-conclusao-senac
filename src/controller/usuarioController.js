import { buscarMatricula, buscarNome, buscarTodos, deletar, updatear, cadastrar, buscarMatriculaComSenha, cadastrarAdmin } from "../model/usuario.js";
import 'dotenv/config';
import JsonWebToken from 'jsonwebtoken'
import { hash, compare } from "bcrypt";

//////////////////////////
// Cryptografar a senha //
/////////////////////////
const cryptografar = (senha) => {
    try{
        hash(senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { res.status(500).send({ erro: errBcrypt }) }
            return hash
        })
    }catch(error){
        return res.status(500).send({Erro:error});
    }
}

//////////////////
//  CADASTRAR  //
////////////////
const cadastrarUsuario = (req, res) => {
    try{
        if (req.body.nome == "" |isNaN(parseFloat(req.body.matricula))| isNaN(req.body.matricula) | req.body.senha == "") {
            return res.status(404).send({ mensagem: "Todos os campos tem que ser preenchidos" });
        }

        buscarMatricula(req.body.matricula).then(resposta => {
            
            if (resposta.length == 0) {
                hash(req.body.senha, 10, (errBcrypt, senha) => {
                    if (errBcrypt) { res.status(500).send({ erro: errBcrypt }) }
                    cadastrar(req.body.nome, req.body.matricula, senha).then(resp => {
                        return res.status(200).send({ mensagem: "Usuario cadastrado com sucesso!", Usuario: { "nome": req.body.nome, "matricula": req.body.matricula } });
                    })
                })
            } else {
                return res.status(404).send({ mensagem: "Usario já existe" });
            }
        })
   }catch(error){
      return res.status(500).send({Erro:error});
   }


}

///////////////////////
//  CADASTRAR Admin //
/////////////////////
const cadastrarUsuarioAdmin = (req, res) => {
    try{
    if (req.body.nome == "" |isNaN(parseFloat(req.body.matricula))| isNaN(req.body.matricula) | req.body.senha == "") {
        return res.status(404).send({ mensagem: "Todos os campos tem que ser preenchidos" });
    }

    buscarMatricula(req.body.matricula).then(resposta => {
        
        if (resposta.length == 0) {
            hash(req.body.senha, 10, (errBcrypt, senha) => {
                if (errBcrypt) { res.status(500).send({ erro: errBcrypt }) }
                cadastrarAdmin(req.body.nome, req.body.matricula, senha).then(resp => {
                    return res.status(200).send({ mensagem: "Usuario cadastrado com sucesso!", Usuario: { "nome": req.body.nome, "matricula": req.body.matricula } });
                })
            })
        } else {
            return res.status(404).send({ mensagem: "Usario já existe" });
        }
    })
   }catch(error){
      return res.status(500).send({Erro:error});
   }

}
//////////////
//  LOGIN  //
////////////
const loginUsuario = (req, res) => {
    try{
        buscarMatriculaComSenha(req.body.matricula).then(resp => {
            if (resp.length == 0) {
                res.status(404).send({ mensagem: "Nenhum Usuario encontrado" });
            } else {
                compare(req.body.senha, resp[0].senha, (error, result) => {

                    ///////////////////////
                    //caso de algum erro//
                    /////////////////////
                    if (error) {
                        return res.status(404).send({ mensagem: "Erro na validação da senha" });
                    }
                    ///////////////////
                    // senha valida //
                    /////////////////
                    if (result) {
                        ////////////////////////
                        //   Gerando o Token //
                        //////////////////////
                        const token = JsonWebToken.sign({
                            id: resp[0].id,
                            nome: resp[0].nome,
                            matricula: resp[0].matricula
                        }, process.env.JWT_KEY, { expiresIn: "30m" })
                        //////////////////////////////////////////////
                        //Retornando informações do Usuario e token//
                        ////////////////////////////////////////////
                        return res.status(200).send({
                            usuario: {
                                id: resp[0].id,
                                nome: resp[0].nome,
                                matricula: resp[0].matricula
                            },
                            token: token
                        });

                    } else {

                        res.status(404).send({ mensagem: "Usuario não autenticado" });

                    }

                })
            }
        })
    }catch(error){
        return res.status(500).send({Erro:error});
    }
}
//////////////////////////
//  TODOS OS USUARIOS  //
////////////////////////
const buscarTodosUsuarios = (req, res) => {
    try{
        buscarTodos().then(resp => {
            res.status(200).send(resp);
    })
   }catch(error){
        return res.status(500).send({Erro:error});
    }

}

//////////////////////
//  BUSCAR POR ID  //
////////////////////
const consultarUsuarioId = (req, res) => {
  try{
        buscarMatricula(req.params.matricula).then(resp => {
            if (resp.length == 0) {
                res.status(404).send({ mensagem: "Nenhum Usuario encontrado" });
            } else {
                res.status(200).send(resp);
            }

        })
}catch(error){
    return res.status(500).send({Erro:error});
}
}

////////////////////////
//  BUSCAR POR NOME  //
//////////////////////
const consultarUsuarioNome = (req, res) => {

    try{
        buscarNome(req.params.nome).then(resp => {
            console.log(resp)
            if (resp.length == 0) {
                res.status(404).send({ mensagem: "Nenhum Usuario encontrado" });
            } else {
                res.status(200).send(resp);
            }

        })
    }catch(error){
        return res.status(500).send({Erro:error});
    }
}
//////////////////
//  ATUALIZAR  //
////////////////
const atualizarUsuario = (req, res) => {
    try{
        buscarMatricula(req.body.matricula).then(resp => {
            if (!resp[0]) {
                res.status(404).send({ mensagem: "Usuario não existe!" });
            } else {
                updatear(req.body.matricula, req.body.novoNome).then(resp => {
                    res.status(200).send({ mensagem: "Nome do Usuario alterado!", Usuario: req.body });
                })

            }
        })
    }catch(error){
        return res.status(500).send({Erro:error});
    }
}
////////////////
//  EXCLUIR  //
//////////////

const ExcluirUsuario = (req, res) => {
    try{
        deletar(req.body.matricula).then(resp => {
            if (resp.deletedCount == 0) {
                res.status(404).send({mensagem:"Não existe usuario com essa Matricula"})
            } else {
                res.status(200).send({mensagem:"Usuario excluido com sucesso!"})
            }

        })
    }catch(error){
        return res.status(500).send( JSON.parse ({Erro:error}));
    }
}


export { buscarTodosUsuarios, cadastrarUsuario, cadastrarUsuarioAdmin, consultarUsuarioId, atualizarUsuario, ExcluirUsuario, loginUsuario, consultarUsuarioNome }
import { filme, buscarMatricula, buscarTitulo, buscarTodos, deletar, updatear, cadastrar, deletarID, } from "../model/filme.js"


////////////////////
// BUSCAR TODOS  //
//////////////////
const buscarTodosFilmes = (req, res) => {
    try{
    buscarTodos().then(resp => {
        return res.status(200).send(resp);
    })
    }catch(error){
        return res.status(500).send({Erro:error});
    }
}

//////////////////
//  CADASTRAR  //
////////////////
const cadastrarFilme = (req, res) => {
    try{
    //Verifica se tem algum campo vazio
    if (req.body.titulo == "" | isNaN(parseFloat(req.body.duracao)) | isNaN(parseFloat(req.body.ano)) | req.body.genero == "" | req.body.diretor == "" | req.body.atore == "" | req.body.sinopse) {
        return res.status(404).send({ mensagem: "Todos os campos tem que ser preenchidos" });
    }
    //verifica se já existe algum filme igual ao novo titulo
    buscarTitulo(req.body.titulo).then(resposta => {
        if (resposta.length != 0) {
            return res.status(404).send({ mensagem: "Filme com esse titulo já existe!" });
        } else {
            //salva o filme
            cadastrar(req.body.titulo, req.body.duracao, req.body.ano, req.body.genero, req.body.diretor, req.body.atores, req.body.sinopse).then(resp => {
                res.status(200).send({ mensagem: "Filme cadastrado com sucesso!", filme: req.body });
            })
        }
    })
  }catch(error){
    return res.status(500).send({Erro:error});
}

}

/////////////////////
// BUSCAR POR ID  //
///////////////////
const consultarFilmeId = (req, res) => {
    
try{
    buscarMatricula(req.params.id).then(resp => {
        if (resp == null) {
            res.status(404).send({ mensagem: "Nenhum filme encontrado" });
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
/////////////////
const atualizarFilme = (req, res) => {
    try{
        //////////////////////////////////////
        //Verifica se tem algum campo vazio//
        ////////////////////////////////////
        if (req.body.id == "" | req.body.novoTitulo == "" | req.body.duracao == "" | req.body.ano == "" | req.body.genero == "" | req.body.diretor == "" | req.body.atore == "" | req.body.sinopse) {
            return res.status(404).send({ mensagem: "Todos os campos tem que ser preenchidos" });
        }
        ///////////////////////////////
        //verifica se o filme existe//
        /////////////////////////////
        buscarMatricula(req.body.id).then(resp => {

            if (resp == null) {
                return res.status(404).send({ mensagem: "Filme nao existe!" });
            } else {
                ///////////////////////////////////////////////////////////
                //verifica se já existe algum filme igual ao novo titulo//
                /////////////////////////////////////////////////////////
                buscarTitulo(req.body.novoTitulo).then(resposta => {
                    if (resposta.length != 0) {
                        return res.status(404).send({ mensagem: "Filme com esse titulo já existe!" });
                    } else {
                        ////////////////////////
                        //salva a atualização//
                        //////////////////////
                        updatear(req.body.id, req.body.novoTitulo, req.body.duracao, req.body.ano, req.body.genero, req.body.diretor, req.body.atores, req.body.sinopse).then(resp => {
                            return res.status(200).send({ mensagem: "Titulo do filme alterado!", filme: req.body });
                        })
                    }
                })



            }
        })
    }catch(error){
       return res.status(500).send({Erro:error});
    }
}

////////////////////////
// EXCLUIR  POR NOME //
//////////////////////
const ExcluirFilme = (req, res) => {
    try{
        if (req.body.titulo == "") { return res.status(404).send({ mensagem: "Todos os campos tem que ser preenchidos" }); }

        buscarTitulo(req.body.titulo).then(resp => {
            console.log(resp)
            if (resp.length == 0 ) {
                return res.status(404).send({ mensagem: "Filme nao existe!" });
            } else {
                deletar(req.body.titulo).then(resp => {

                    return res.status(200).send("Filme excluido com sucesso!")


                })
            }
        })

    }catch(error){
        return res.status(500).send({Erro:error});
    }

}
////////////////////////
//  EXCLUIR  POR ID  //
//////////////////////
const ExcluirFilmeId = (req, res) => {
    try{
        if (req.body.id == "") { return res.status(404).send({ mensagem: "Todos os campos tem que ser preenchidos" }); }

        buscarMatricula(req.body.id).then(resp => {
            if (resp == null) {
                return res.status(404).send({ mensagem: "Filme nao existe!" });
            } else {
                deletarID(req.body.id).then(resp => {
                    res.status(200).send({mensagem:"Filme excluido com sucesso!"})
                })
            }
        })
    }catch(error){
        return res.status(500).send({Erro:error});
    }

}





export { buscarTodosFilmes, cadastrarFilme, consultarFilmeId, atualizarFilme, ExcluirFilme, ExcluirFilmeId }
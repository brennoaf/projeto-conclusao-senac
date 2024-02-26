import mongoose from "mongoose"

/* 
{
    const filmeSchema = new mongoose.Schema({
    titulo: {type:String, uppercase:true},
    ano:Number,
    Lançado:Number,
    duracao: Number,
    genero:{type:String, uppercase:true},
    diretor:{type:String, uppercase:true},
    atores:[{type:String, uppercase:true}],
    Sinopse:{type:String, uppercase:true}
})
}

*/
/////////////////
//   SCHEMA   //
///////////////
const filmeSchema = new mongoose.Schema({
    titulo: {type:String, uppercase:true},
    ano:Number,
    duracao: Number,
    genero:{type:String, uppercase:true},
    diretor:{type:String, uppercase:true},
    atores:[{type:String, uppercase:true}],
    sinopse: { type: String, uppercase: true }
})

const filme = new mongoose.model("filmes", filmeSchema)
const filmes = filme

const cadastrar = async (titulo, duracao, ano, genero, diretor, atores, sinopse) => {

    const film = new filmes({
        titulo: titulo,
        ano:ano,
        duracao: duracao,
        genero: genero,
        diretor: diretor,
        atores: atores,
        sinopse:sinopse
        
    })
    const result = await film.save()
}

const buscarMatricula = async (id) => {
    
    try {
        const retonaFilme = await filmes.findById(id)
        //console.log(retonaFilme)
        return retonaFilme
       // console.log(retonaFilme)
      } catch (e) {
       return []
      }
      

}
const buscarTitulo = async (titulo) => {
    const retonaFilme = await filmes.find({ titulo: titulo })
    return retonaFilme
}

const buscarTodos = async () => {
    const retonaFilme = await filmes.find().then()
    console.log(retonaFilme)
    return retonaFilme
}

const deletar = async (nome) => {
    const result = await filmes.deleteOne({ titulo: nome })
    return result
}


const deletarID = async (id) => {
    const result = await filmes.deleteOne({ _id: id })
    return result
}

const updatear = async (id, novoTitulo,duracao, ano, genero,diretor,atores,sinopse) => {
    const result = await filmes.updateOne({ _id: id }, { titulo: novoTitulo, duracao: duracao, ano: ano, genero: genero, diretor: diretor, atores: atores, sinopse: sinopse })
    
}




export { filme, buscarTitulo, buscarTodos, deletar, updatear, cadastrar, buscarMatricula,deletarID };


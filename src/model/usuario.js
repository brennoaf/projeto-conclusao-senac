import mongoose from "mongoose"

/*
const usuarioSchema = new mongoose.Schema({
    nome: {type:String, uppercase:true},
    matricula: Number,
    senha:String,
    permissao:[{type:String, uppercase:true}]
})
 */

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, uppercase: true },
    matricula: Number,
    senha: String,
    perfil:[{type:Array}]
})

const usuario = new mongoose.model("usuario", usuarioSchema)
const usuarios = usuario

const buscarMatricula = async (matricula) => {

    try {
        const retonaUsuario = await usuarios.find({ matricula: matricula }).select({ senha: 0 })
        return retonaUsuario
    } catch (e) {
        return []
    }

}
const buscarMatriculaComSenha = async (matricula) => {

    try {
        const retonaUsuario = await usuarios.find({ matricula: matricula })
        return retonaUsuario
    } catch (e) {
        return []
    }

}

const buscarNome = async (nome) => {
    console.log(nome)
    try {
        const retonaUsuario = await usuarios.find({ nome: nome })
        return retonaUsuario
    } catch (e) {
        return []
    }
}

const buscarTodos = async () => {
    const retonaUsuario = await usuarios.find().select({ senha: 0 }).then()
    return retonaUsuario
}

const deletar = async (matricula) => {
    const result = await usuarios.deleteOne({ matricula: matricula })
    return result
}

const updatear = async (matricula, novoNome) => {
    const result = await usuarios.updateOne({ matricula: matricula }, { nome: novoNome })
    console.log(result)
}

const cadastrar = async (nome, matricula, senha) => {
    const usuario = new usuarios({
        nome: nome,
        matricula: matricula,
        senha: senha,
        perfil:[{admin:"0"}]
    })
    const result = await usuario.save()
}

const cadastrarAdmin = async (nome, matricula, senha) => {
    const usuario = new usuarios({
        nome: nome,
        matricula: matricula,
        senha: senha,
        perfil:[{admin:"1"}]
    })
    const result = await usuario.save()
}

export { buscarNome, buscarTodos, deletar, updatear, cadastrar, buscarMatricula, buscarMatriculaComSenha, cadastrarAdmin };
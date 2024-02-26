import JsonWebToken from 'jsonwebtoken'
import 'dotenv/config';
import {buscarMatricula} from "../model/usuario.js"
import 'dotenv/config';
const admin = (req, res, next) => {
     ///////////////////////////////////////////////////
     //pega o Token e descodifica para poder validar///
     // A matricula e ver se o Usuario é Admin     ///
     ////////////////////////////////////////////////
     try{
     const token = req.headers.authorization.split(' ')[1]
     const decode = JsonWebToken.verify(token, process.env.JWT_KEY)
   buscarMatricula(decode.matricula).then(resp => {
          
     const obj = resp[0].perfil[0]
          if (resp.length == 0) {
              return res.status(404).send({ mensagem: "Nenhum Usuario encontrado aqui" });
          } 
          if(obj[0].admin != process.env.PERMISSAO){
            return res.status(200).send({mensagem: "Usuario não tem permissão"});
          }else{
               next();
          }

      })
     }catch(error){
          return res.status(401).send({ "status": 401 , mensagem: 'Falha na autenticação' })
     }
 
}

export {admin}
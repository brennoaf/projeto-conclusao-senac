import JsonWebToken from 'jsonwebtoken'
import 'dotenv/config';
const login = (req, res, next) => {
  

      try {
        ////////////////////////////////////////////
        //Pega o token no header da requisição   //
        //que é passado com o nome authorization//
        /////////////////////////////////////////
        const token = req.headers.authorization.split(' ')[1]
        const decode = JsonWebToken.verify(token, process.env.JWT_KEY)
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({ "status": 401 , mensagem: 'Falha na autenticação' })
    }
}

export {login}
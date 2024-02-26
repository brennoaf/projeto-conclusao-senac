import 'dotenv/config';
import mongoose from 'mongoose';

const dbUsuario = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function connectDB(){
    mongoose.connect(`mongodb+srv://${dbUsuario}:${dbPassword}@projeto.ihjayd9.mongodb.net/api?retryWrites=true&w=majority`)
        return mongoose.connection
}

export default connectDB;
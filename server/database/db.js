import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const Connection = async () => {
    mongoose.set('strictQuery', true);
    const URL = `mongodb://${username}:${password}@ac-dodydpx-shard-00-00.bsvn2un.mongodb.net:27017,ac-dodydpx-shard-00-01.bsvn2un.mongodb.net:27017,ac-dodydpx-shard-00-02.bsvn2un.mongodb.net:27017/?ssl=true&replicaSet=atlas-flo8eq-shard-0&authSource=admin&retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};


export default Connection;
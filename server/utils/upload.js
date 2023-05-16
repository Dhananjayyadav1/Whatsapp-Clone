import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-dodydpx-shard-00-00.bsvn2un.mongodb.net:27017,ac-dodydpx-shard-00-01.bsvn2un.mongodb.net:27017,ac-dodydpx-shard-00-02.bsvn2un.mongodb.net:27017/?ssl=true&replicaSet=atlas-flo8eq-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return `${Date.now()}-file-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
});

export default multer({storage}); 
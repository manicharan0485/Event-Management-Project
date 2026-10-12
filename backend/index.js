import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoute from './routes/users.js'
import eventRoute from './routes/events.js'

import './db/conn.js';

const app = express();

dotenv.config()
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/', userRoute);
app.use('/', eventRoute);

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(port, (error) => {
    if(error){
        console.log(error)
    } else{
        console.log(`Server is running on port: http://localhost:${port}`)
    }
});

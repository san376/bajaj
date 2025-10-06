import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {register, logOut, login} from './userController.js';


dotenv.config();

// Create Express app
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));
app.get('/',(req,res)=>{
    res.send('API WORKING GREAT')
})

app.listen(3000, () => {
  console.log('Server is running on port', 3000);
});

app.post('/api/user/signup', register);
app.post('/api/user/login', login);
app.get('/api/user/logout', logOut);

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

//setting up the body-parser so that we can properly send our request
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

//use express middleware to connect routes to our application:
app.use('/posts', postRoutes);                 //every route inside postRoutes is going to start with posts. (this must be placed below cors)
app.use('/user', userRoutes);

app.get('/', (req,res) => {
    res.send('Hello to Memories Application API');
})

//connect server application with real database - for that we use mongodb, the cloud/atlast version
// https://www.mongodb.com/cloud/atlas - host database on their cloud
// const CONNECTION_URL = 'mongodb+srv://celestcyr:celestine123@mern-project0.i0gf3.mongodb.net/MERN-Project0?retryWrites=true&w=majority'
const PORT = process.env.PORT || 4000;

//use mongoose to connect to db
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);
//.env file --> npm i dotenv
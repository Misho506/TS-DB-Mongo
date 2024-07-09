import express, { Application, Request, Response } from 'express'
import connectDB from './config/db';
import bodyParse from 'body-parser';

const port = process.env.ENV_PORT || 5000

connectDB();

const app = express()

app.use(bodyParse.json())

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/planets', require('./routes/planetRoutes'))
app.use(express.urlencoded({ extended: false })) //Middleware

app.listen(port, () => console.log(`Server started on port ${port}`));
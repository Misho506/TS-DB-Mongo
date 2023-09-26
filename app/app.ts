import express, { Application, Request, Response } from 'express'
import connectDB from './config/db';

const port = process.env.ENV_PORT || 5000

connectDB();

const app = express()

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/planets_news', require('./routes/planetRoutes'))
// app.use(express.urlencoded({ extended: false })) //Middleware

app.listen(port, () => console.log(`Server started on port ${port}`));
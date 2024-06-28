import cors from 'cors';
import connectToMongo from './db';
import express from 'express';
import teachAuthRoutes from './routes/teachAuth';
import studentRoutes from './routes/students';
import resultRoutes from './routes/studR';

require('dotenv').config();
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.BASE_URL,
};

app.use(cors(corsOptions));

app.use(express.json());

// Available Routes
app.use('/auth', teachAuthRoutes);
app.use('/studs', studentRoutes);
app.use('/result', resultRoutes)

app.listen(port, () => {
  console.log(`server listening at port: ${port}`);
});

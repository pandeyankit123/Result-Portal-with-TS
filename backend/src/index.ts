import cors from 'cors';
import connectToMongo from './db';
import express from 'express';
import teachAuthRoutes from './routes/teachAuth';
import studentRoutes from './routes/students';
import resultRoutes from './routes/studR';

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/auth', teachAuthRoutes);
app.use('/studs', studentRoutes);
app.use('/result', resultRoutes)

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

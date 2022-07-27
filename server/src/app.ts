import cors from 'cors';
import dotev from 'dotenv';
import express from 'express';
import indexRouter from './routes';

dotev.config();

const PORT = process.env.PORT!;
const app = express();

app.use(cors());

// Routes

app.use('api/v1', indexRouter);

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

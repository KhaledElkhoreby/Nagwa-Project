import express from 'express';
import dotev from 'dotenv';
import cors from 'cors';

dotev.config();

const PORT = process.env.PORT!;
const app = express();

app.use(cors());

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

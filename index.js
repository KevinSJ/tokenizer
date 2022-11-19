import express from 'express';
import controllers from './src/controllers/index.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(controllers);

app.listen(PORT, () => {
  console.log('listen on port 3000');
});

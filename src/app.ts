import express from 'express';
import router from './routes/itemRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use(express.json());
app.use('/api/items', router);
app.use(errorHandler);

export default app;

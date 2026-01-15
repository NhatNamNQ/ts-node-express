import express from 'express';
import router from './routes/itemRoute.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

const app = express();
app.use('/api/items', router);
app.use(errorHandler);

export default app;

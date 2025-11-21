import * as express from 'express';
import * as cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ganttRoutes from './routes/gantt.js';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app: any = (express as any).default();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

app.use((cors as any).default());
app.use((express as any).default.json());
app.use((express as any).default.urlencoded({ extended: true }));

const mongoDB: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/gantt_db';

mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api', ganttRoutes);

app.get('/health', (_req:express.Request, res:express.Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

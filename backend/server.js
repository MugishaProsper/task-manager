import express from 'express';
import CORS from 'cors';
import { connectToDatabase } from './config/db.config.js';

const app = express();

app.use(express.json());
app.use(CORS())

PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase()
})

import express from 'express';
import CORS from 'cors';
import { connectToDatabase } from './config/db.config.js';
import auth_router from './routes/auth.routes.js';
import router from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(CORS())

const PORT = process.env.port || 5000;

app.use('/api/auth', auth_router);
app.use('/api/tasks', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase()
})

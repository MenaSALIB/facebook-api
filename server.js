import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API Facebook opérationnelle !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
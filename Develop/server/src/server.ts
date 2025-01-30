import express from 'express';
import cors from 'cors';
import sequelize from './config/connection';
import apiRoutes from './routes/api/index';
import authRoutes from './routes/auth-routes'; 
import steamRouter from './routes/api/steam-routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes); 

app.use('/api', apiRoutes);
app.use('/api/steam', steamRouter);

app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

sequelize.sync().then(() => {
  console.log('✅ Database synced successfully!');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

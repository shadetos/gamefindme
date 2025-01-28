import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes';
import sequelize from './config/connection';

const app = express();
const PORT = process.env.PORT || 3001;

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully!');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/api/auth', authRoutes);

// Default fallback for unmatched routes
app.get('*', (req, res) => {
  res.status(404).send('Route not found.');
});

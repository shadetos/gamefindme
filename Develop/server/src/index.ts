import path from 'path';
import express from 'express';
import sequelize from './config/connection';
import authRoutes from './routes/auth-routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Serve the client production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../Client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/dist/index.html'));
  });
}

// Connect to the database and start the server
sequelize.sync().then(() => {
  console.log(`Connected to database successfully.`);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

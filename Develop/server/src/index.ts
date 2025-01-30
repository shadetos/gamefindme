import express from 'express';
import cors from 'cors';
import sequelize from './config/connection';
import apiRoutes from './routes/api/index';
import steamRouter from './routes/api/steam-routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/api/steam', steamRouter);

sequelize.sync().then(() => {
  console.log('Database synced successfully!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

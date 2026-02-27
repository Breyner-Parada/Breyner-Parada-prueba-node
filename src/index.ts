import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import routes from './routes/index.js';
// Import models to initialize associations
import './models/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Prueba de conexión a la base de datos
const initializeApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully');

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('✓ Models synchronized with database');

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`✓ Server is running at http://localhost:${port}`);
      console.log(`✓ Health check available at http://localhost:${port}/api/health`);
    });
  } catch (error) {
    console.error('✗ Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();

export default app;

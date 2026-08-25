import 'reflect-metadata';
import express from 'express';
import path from 'node:path';
import { AppDataSource } from './database/data-source';
import { authRoutes } from './routes/auth.routes';
import { productsRoutes } from './routes/products.routes';
import { seedProducts } from './database/seed';
import { errorHandler } from './shared/middlewares/error-handler';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger';
import { corsMiddleware } from './shared/middlewares/cors';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(corsMiddleware);
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/images', express.static(path.resolve(__dirname, '../public/images')));
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

app.use(errorHandler);

async function bootstrap() {
  await AppDataSource.initialize();
  await seedProducts();
  app.listen(port, () => console.log(`Furniro API running at http://localhost:${port}`));
}

bootstrap();

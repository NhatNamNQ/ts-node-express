import app from './app.js';
import config from './config/config.js';
import { AppDataSource } from './config/database.js';
import 'reflect-metadata';

AppDataSource.initialize()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error); // In ra lỗi chi tiết
    process.exit(1); // Thoát nếu lỗi
  });

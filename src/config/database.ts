import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Item } from '../entities/Item.js';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // QUAN TRỌNG: Tự động tạo bảng khi chạy local
  logging: false,
  entities: [Item], // Tự động load các file Entity
  subscribers: [],
  migrations: [],
});

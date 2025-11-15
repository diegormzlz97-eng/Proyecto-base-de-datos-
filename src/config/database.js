import mysql from 'mysql2/promise';
import { ConnectionError } from '../core/errors/connection.error.js'

const DATABASE_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export async function getConnection() {
  try {
    const connectionString = DATABASE_CONFIG
    return await mysql.createConnection(connectionString)
  } catch (error) {
    throw new ConnectionError('Conexion fallida a la base de datos', 500, error);
  }
}



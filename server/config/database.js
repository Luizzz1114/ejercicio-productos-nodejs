import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	user: process.env.PG_USER || 'postgres',
	host: process.env.PG_HOST || 'localhost',
	database: process.env.PG_DATABASE || 'productos_crud',
	password: process.env.PG_PASSWORD || 'tu_contraseña',
	port: process.env.PG_PORT || 5432,
});

pool.connect((error) => {
	if(error) throw error;
	console.log('Base de datos conectada.');
});

export default pool;
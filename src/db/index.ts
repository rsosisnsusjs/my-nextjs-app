import dotenv from 'dotenv'
dotenv.config()
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    keepAliveInitialDelay: 0, // 0 by default. 10 วินาที
    enableKeepAlive: true, // false by default.
  });
  
const dbSingleton = async () => {
    return drizzle({ client: await connection })
}
declare const globalThis: {
    dbGlobal: ReturnType<typeof dbSingleton>;
} & typeof global;

const conn = globalThis.dbGlobal ?? dbSingleton();

export default conn;

if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = conn
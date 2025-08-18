import mysql from "mysql2/promise";

declare global {
  var botDb: mysql.Pool | undefined;
  var authDb: mysql.Pool | undefined;
}

function createPool(database: string) {
  const pool = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database,
    waitForConnections: true,
    connectionLimit: 10,
  });

  // Test connection once
  pool.getConnection()
    .then(conn => {
      console.log(`Database "${database}" connected successfully!`);
      conn.release();
    })
    .catch(err => {
      console.error(`Database "${database}" connection failed!`, err);
    });

  const closePool = async () => {
    try {
      await pool.end();
      console.log(`Database "${database}" pool closed successfully!`);
    } catch (err) {
      console.error(`Error closing "${database}" pool:`, err);
    }
  };

  process.on("exit", closePool);
  process.on("SIGINT", () => { closePool().then(() => process.exit(0)); });
  process.on("SIGTERM", () => { closePool().then(() => process.exit(0)); });

  return pool;
}

export const botDb = global.botDb ?? (global.botDb = createPool(process.env.BOT_DB_NAME!));
export const authDb = global.authDb ?? (global.authDb = createPool(process.env.AUTH_DB_NAME!));
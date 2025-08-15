import mysql from "mysql2/promise";

function createPool(config: {
  database: string;
  connectionLimit?: number;
}) {
  const pool = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: config.database,
    waitForConnections: true,
    connectionLimit: config.connectionLimit ?? 10
  });

  (async () => {
    try {
      // Test Connection
      const connection = await pool.getConnection();
      // Connection Success! :)
      console.log(`Database "${config.database}" Connected Successfully!`);
      connection.release();
    } catch (err) {
      // Connection Failed! :(
      console.error(`Database "${config.database}" Connection Failed!`, err);
    }
  })();
  
  return pool;
}

export const botDb = createPool({
  database: process.env.BOT_DB_NAME!
});

export const authDb = createPool({
  database: process.env.AUTH_DB_NAME!
});
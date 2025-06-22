import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

(async () => {
  try {
    // Test Connection
    const connection = await pool.getConnection();
    // Connection Success :)
    console.log("Database connected successfully!");
    connection.release();
  } catch (error) {
    // Connection Failed :(
    console.error("Database connection failed:", error);
  }
})();

export default pool;
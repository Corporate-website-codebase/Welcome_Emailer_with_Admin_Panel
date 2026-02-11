const { Pool } = require("pg");

// Supabase PostgreSQL connection
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ,
 ssl: {
    rejectUnauthorized: false,
  },
});

// Create users table if it doesn't exist
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing database:", error.message);
    if (error.code === "ENOTFOUND") {
      console.error("\n⚠️  IMPORTANT: Cannot connect to Supabase database.");
      console.error("Please verify your DATABASE_URL in the .env file.");
      console.error("Get the correct connection string from:");
      console.error(
        "Supabase Dashboard → Project Settings → Database → Connection String\n",
      );
    }
  }
};

module.exports = { pool, initDatabase };

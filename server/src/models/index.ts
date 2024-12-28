import { Client } from 'pg'; 

const db = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    ssl: {
      rejectUnauthorized: false // Adjust if needed
    }
  }); 

export  function ConnectToDB() {
    return db.connect()
  }

export default db ; 
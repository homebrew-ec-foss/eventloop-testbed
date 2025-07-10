import sqlite3 from 'sqlite3';
import fs from 'fs';
import execute from './utils/execute.js';

function initDB() {
  const create_db = new sqlite3.Database('./eventloop.db', sqlite3.OPEN_CREATE);
  const schema = fs.readFileSync('../schema.sql', 'utf-8');

  try {
      execute(create_db, schema);
  }
  catch (err) {
      console.error('Error when creating database: ', err);
  }
  finally {
      create_db.close();
  }
}

const db = new sqlite3.Database('./eventloop.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.info('Initialising default db...');
    initDB()
  }
  else console.info('Connected to SQLite database');
});

export default db

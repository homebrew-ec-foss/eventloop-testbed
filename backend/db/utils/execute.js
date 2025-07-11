import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

// auto-initialise an empty db using default schema
const db_path = path.resolve('./eventloop.db');
const schema_path = path.resolve('./db/schema.sql');

let dbExists = fs.existsSync(db_path);

const db = new sqlite3.Database('./eventloop.db', (err) => {
  if (err) return console.error('Failed to open database: ', err);

  if(!dbExists) {
    const schema = fs.readFileSync(schema_path, 'utf-8');
    execute(schema);
    console.info('Successfully created db.')
  }
});

/**
 * Generic SQL command executor
 * @param {string} sql - SQL Command
 * @param {string[]} params - values of columns in SQL command
 */

const execute = async (sql, params = []) => {
  if (params && params.length > 0) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export default execute
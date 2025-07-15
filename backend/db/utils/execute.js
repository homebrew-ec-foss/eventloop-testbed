import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import insertIntoTable from './insert.js';
import readline from 'readline';

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
    
    // prompt for creating an admin
    try {
      console.log('creating admin...');
      promptAdminCreation();
    }
    catch (err) {
      console.error('error: ', err);
    }
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

export async function promptAdminCreation() {
    const name = await promptInput('Enter the name: ') || 'admin';
    let email = await promptInput('Enter the email: ');

    while (!email) {
      console.log('email required');
      email = await promptInput('Enter the email: ');
    }

    const role = 'admin';

    try {
      await insertIntoTable('dbAuthorisedUsers', ['name', 'email', 'role'], [name, email, role]);
      return console.log('admin created with name: ', name); 
    }
    catch (err) {
      return console.error('error when creating admin: ', err);
    }
}

/**
 * Generic SQL command executor
 * @param {string} sql - SQL Command
 * @param {string[]} params - values of columns in SQL command
 */

const execute = async (sql, params = [], select) => {
  if (select) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  }
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
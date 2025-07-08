const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./eventloop.db');

const schema = fs.readFileSync('./db/schema.sql', 'utf8');

db.exec(schema, (err) => {
  if (err) console.error(err);
  else console.log("DB initialized");
  db.close();
});

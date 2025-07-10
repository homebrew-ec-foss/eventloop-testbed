/**
 * Generic SQL command executor
 * @param {sqlite3.Database} db - SQLite database instance
 * @param {string} sql - SQL Command
 * @param {string[]} params - values of columns in SQL command
 */

const execute = async (db, sql, params = []) => {
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
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
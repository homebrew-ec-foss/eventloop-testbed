import insertIntoTable from '../db/utils/insert.js';

/**
 * Adds a new organiser to the DB
 * @param {sqlite3.Database} db - SQLite db
 * @param {string} name - name
 * @param {string} email - email
 */
export async function addOrganiser(db, name, email) {
  try {
    await insertIntoTable(db, 'organisers', ['name', 'email'], [name, email]);
    return { success: true, name, email };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      throw new Error('Email already in use');
    }
    throw err;
  }
}

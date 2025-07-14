import insertIntoTable from '../db/utils/insert.js';
import updateIntoTable from '../db/utils/update.js';

/**
 * Adds a new event to the DB
 * @param {string} name - name
 * @param {} date - date
 */
export async function addEvent(name, date) {
  try {
    await insertIntoTable('events', ['name', 'date'], [name, date]);
    return { success: true, name, date };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      throw new Error('Email already in use');
    }
    throw err;
  }
}

/**
 * 
 * @param {integer} id 
 * @param {string} name 
 * @param {} date 
 * @returns 
 */
export async function editEvent(id, name, date) {
  try {
    await updateIntoTable('events', ['name', 'date'], [name, date], id);
    return { success: true, id, name, date };
  } catch (err) {
    console.error(err)
    return { success: false, error: err.message };
  }
}
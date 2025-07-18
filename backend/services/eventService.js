import getRecords from '../db/utils/select.js';
import insertRecord from '../db/utils/insert.js';
import updateRecord from '../db/utils/update.js';
import deleteRecord from '../db/utils/delete.js';

/**
 * Get all events
 * @param {string} name - name
 * @param {string} email - email
 */
export async function getEvents(fields = {}) {
  try {
    const events = await getRecords('events', fields);
    if (!events) return { success: false }
    return { events };
  } catch (err) {
    return console.error('err occurred while fetching records:', err);
  }
}

/**
 * Adds a new event to the DB
 * @param {string} name - name
 * @param {} date - date
 */
export async function addEvent(name, date) {
  try {
    const event = await insertRecord('events', { name, date });
    return { success: true, event: { name, date } };
  } catch (err) {
    console.error('err: ', err);
  }
}

/**
 * Edit an event
 * @param {integer} id 
 * @param {string} name 
 * @param {} date 
 * @returns 
 */
export async function editEvent(id, name, date) {
  try {
    const updatedRecord = await updateRecord('events', id, { name, date });
    return { success: true, updatedRecord };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete an event
 * @param {integer} id 
 * @param {string} name 
 * @param {} date 
 * @returns 
 */
export async function deleteEvent(id) {
  try {
    const deletedRecord = await deleteRecord('events', id);
    return deletedRecord;
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
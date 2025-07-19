import insertRecord from '../db/utils/insert.js';
import updateRecord from '../db/utils/update.js';
import getRecords from '../db/utils/select.js';

/**
 * Get all organisers
 * @param {string} name - name
 * @param {string} email - email
 */
export async function getParticipants(fields = {}) {
  try {
    const participants = await getRecords('participants', fields);
    if (!participants) return { success: false }
    return { participants };
  } catch (err) {
    return console.error('err occurred while fetching records:', err);
  }
}

/**
 * Adds a new organiser to the DB
 * @param {string} name - name
 * @param {string} email - email
 */
export async function addParticipant(name, email) {
  try {
    const participant = await insertRecord('participants', { name, email });
    if (!participant) return { success: false }
    return { success: true, participant };
  } catch (err) {
    return console.error('err occurred while inserting record:', err);
  }
}
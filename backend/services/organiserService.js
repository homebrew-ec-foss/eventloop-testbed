import insertRecord from '../db/utils/insert.js';
import updateRecord from '../db/utils/update.js';
import getRecords from '../db/utils/select.js';

/**
 * Get all organisers
 * @param {string} name - name
 * @param {string} email - email
 */
export async function getOrganisers(fields = {}) {
  try {
    const organisers = await getRecords('dbAuthorisedUsers', fields);
    if (!organisers) return { success: false }
    return { organisers };
  } catch (err) {
    return console.error('err occurred while fetching records:', err);
  }
}

/**
 * Adds a new organiser to the DB
 * @param {string} name - name
 * @param {string} email - email
 */
export async function addOrganiser(name, email, role) {
  try {
    const organiser = await insertRecord('dbAuthorisedUsers', { name, email, role });
    if (!organiser) return { success: false }
    return { success: true, organiser };
  } catch (err) {
    return console.error('err occurred while inserting record:', err);
  }
}

/**
 * Edit an organiser
 * @param {string} name - name
 * @param {string} email - email
 */
export async function editOrganiser(name, email, role) {
  try {
    const organiser = await updateRecord('dbAuthorisedUsers', { name, email, role });
    return { success: true, organiser };
  } catch (err) {
    return console.error('err occurred while inserting record:', err);
  }
}
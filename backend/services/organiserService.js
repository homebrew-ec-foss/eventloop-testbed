import insertRecord from "../db/utils/insert.js";

/**
 * Adds a new organiser to the DB
 * @param {string} name - name
 * @param {string} email - email
 */
export async function addOrganiser(name, email, role) {
  try {
    const organiser = await insertRecord('dbAuthorisedUsers', { name, email, role });
    return organiser;
  } catch (err) {
    return console.error('err occurred while inserting record:', err);
  }
}

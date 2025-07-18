import { supabase } from "../../api/index.js";

/**
 * Generic 'UPDATE' function
 * @param {string} table - table name
 * @param {int} id - id of the record
 * @param {object} fields - fields to be updated
 * @returns {Promise<object>} - updated record 
 */

async function updateRecord (table, id, fields = []) {
  if (!table || !id || !fields) throw new Error('Invalid or missing arguments');

  const { data, error } = await supabase.from(table).update([fields]).eq('id', id).select();

  if (error) {
    console.error(`error while updating ${table}:`, error);
    throw error;
  }
  return data;
}

export default updateRecord
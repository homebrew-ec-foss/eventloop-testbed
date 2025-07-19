import { supabase } from "../../api/index.js";

/**
 * Delete a record from a Supabase table.
 * @param {string} tableName - Name of the table to delete.
 * @param {id} record - The id of the record to delete.
 * @returns {Promise<object>} - The Supabase response.
 */
export async function deleteRecord(table, id) {
  const { data, error } = await supabase.from(table).delete().eq('id', id);

  if (error) {
    return false
  }
  return data;
}

export default deleteRecord
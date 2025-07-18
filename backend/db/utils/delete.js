import { supabase } from "../../server.js";

/**
 * Delete a record from a Supabase table.
 * @param {string} tableName - Name of the table to delete.
 * @param {id} record - The id of the record to delete.
 * @returns {Promise<object>} - The Supabase response.
 */
export async function deleteRecord(table, id) {
  const { data, error } = await supabase.from(table).delete().eq('id', id);

  console.log(id);

  if (error) {
    console.error('delete error:', error);
    return false
  }
  console.log('data.js: ', data);
  return data;
}

export default deleteRecord
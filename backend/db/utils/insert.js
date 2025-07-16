import { supabase } from "../../server.js";

/**
 * Insert a record into a Supabase table.
 * @param {string} tableName - Name of the table to insert into.
 * @param {object} record - The record to insert.
 * @returns {Promise<object>} - The Supabase response.
 */
export async function insertRecord(table, record) {
  const { data, error } = await supabase.from(table).insert([record]);

  if (error) {
    console.error('Insert error:', error);
    return error;
  }
  console.log('data', data);
  return data;
}

export default insertRecord

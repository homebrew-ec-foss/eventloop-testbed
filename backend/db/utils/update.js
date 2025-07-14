import execute from './execute.js';

/**
 * Generic 'UPDATE' function
 * @param {string} table - table name
 * @param {string[]} fields - array of column names
 * @param {any[]} values - array of values (must match fields length)
 * @param {any} id - unique non-editable identifier
 */

const updateIntoTable = async (table, fields, values, id) => {
  if (fields.length !== values.length) {
    throw new Error("Number of columns do not match number of values provided.");
  }

  const clause = fields.map(field => `${field} = ?`).join(", ");
  const sql = `UPDATE ${table} SET ${clause} WHERE id = ?`; // intentionally have placeholders in the query, only `execute()` can handle the values

  return execute(sql, [...values, id]);
};

export default updateIntoTable;

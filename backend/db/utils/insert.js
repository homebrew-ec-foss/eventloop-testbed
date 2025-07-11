import sqlite3 from "sqlite3";
import execute from "./execute.js";

/**
 * Generic record insert function
 * @param {string} table - table name
 * @param {string[]} fields - array of column names
 * @param {any[]} values - array of values (must match fields length)
 */

const insertIntoTable = async (table, fields, values) => {
  if (fields.length !== values.length) {
    throw new Error("Number of columns do not match number of values provided.");
  }

  const columns = fields.join(", ");
  const placeholders = values.map(() => `?`).join(", ");
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`; // intentionally have placeholders in the query, only `execute()` can handle the values

  return execute(sql, values);
};

export default insertIntoTable

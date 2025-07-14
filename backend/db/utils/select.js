import execute from './execute.js';

/**
 * Generic 'SELECT' function
 * @param {string} table - table name
 * @param {string[]} fields - array of column names
 * @param {any[]} values - array of values (must match fields length)
 * @param {Array} operators - array of operators (eg. ['AND', 'AND', 'OR])
 */

const selectFromTable = async (table, fields, values, conditions = []) => {
  if (fields.length !== values.length) {
    throw new Error("Number of columns do not match number of values provided.");
  }

  let sqlClause = '';

  if (conditions.length > 0) {
    fields.forEach((field, index) => {
        const operator = conditions[index]?.operator || ' AND ';

        if (operator === 'OR' && index == 0) sqlClause += `(${field} = ?) `;
        else sqlClause += `${field} = ? `;

        if (index < (fields.length - 1)) sqlClause += `${operator}`;
    })
  }
  else {
    sqlClause = `${fields[0]} = ?`;
  }

  const sql = `SELECT * FROM ${table} WHERE ${sqlClause}`;

  return execute(sql, values, true);
};

export default selectFromTable

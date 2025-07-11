# Learnings - Lalith B Seervi

## Day 1 - 7th July
- Started familiarising myself with the existing codebase
- Learnt how Next.JS routing works

## Day 2 - 8th July
- Started re-writing eventloop backend
- Learnt how to initialise sqlite3 db & execute db commands using the `sqlite` javascript module. Reference: [sqlitetutorial](https://www.sqlitetutorial.net/sqlite-nodejs/)

## Day 3 - 9th July
- Add index.js to `routes` for improved readability.

## Day 4 - 10th July
- A commonJS module imported into another file will result in execution of that module, whether or not you intended for the imported module to be executed.
To avoid this, one must wrap the statements into a function and export it using `module.exports = filename`.

- Wrapped the default db.exec() method as recommended by [sqlitetutorial](https://www.sqlitetutorial.net/sqlite-nodejs/create-tables/).

- Modified the `db.exec()` wrapper (i.e, `execute.js`) to support db initalization and running other CRUD queries.

- Wrote a generic insert record function (i.e, `insert.js`) to reduce code duplication.

- Changed `init.js` to `init_db.js` for more clarity, and modified the code to automatically initialize a db with the default schema if no db is already present.

- Broke down the logic into middlewares and services to improve code-readability.

- Corrected `emailRegex` as it was earlier allowing illegal email formats.

## Day 5 - 11th July
- Fix: syntactical error and circular reference between `events` and `teams` table.
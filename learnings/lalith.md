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
- fix: syntactical error and circular reference between `events` and `teams` table.

- Auto-initalisation of db was not working due to some file restructuring. Tested and fixed it.

    - Earlier, unnecessary passing of `db` object was required to perform CRUD operations. The new implementation fixes it by declaring the `db` object directly where it's required (i.e, `utils/execute.js`).

- feat: added a generic update function that updates the record of a table using the `id` identifier

- feat: added support for creating and editing events

## Day 6 - 12th July
- feat: added a generic select function

- feat: automatic prompting for admin creation if one doesn't already exist

- refactor: used the previous implementation of grouping all non-participants into single table

## Day 8 - 14th July
- feat: integrate Google OAuth for sign-in
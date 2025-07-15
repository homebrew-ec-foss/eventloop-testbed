import selectFromTable from './select.js';
import { promptAdminCreation } from './execute.js';

async function checkAdminRecords() {
    let result = await selectFromTable('dbAuthorisedUsers', ['role'], ['admin']);

    if(!result || result.length < 1) {
        console.log('No admin found in the db.');
        await promptAdminCreation();
    }
    else console.log(`${result.length} admins exist. no need for prompting admin creation`);
}

export default checkAdminRecords
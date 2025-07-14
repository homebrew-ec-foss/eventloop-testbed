import selectFromTable from "./select.js";

export async function getAuthUser(name, email) {
    try {
        const result = await selectFromTable('dbAuthorisedUsers', ['name', 'email'], [name, email], ['OR']);
        if (result) return { success: true, name, email, role: result[0].role};
        else return false;
    }
    catch (err) {
        return console.error(err);
    }
}
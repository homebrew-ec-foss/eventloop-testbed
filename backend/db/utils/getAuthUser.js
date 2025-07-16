import { supabase } from "../../server.js";

export async function getAuthUser(email) {
    try {
        const { data, error } = await supabase.from('dbAuthorisedUsers').select('*').eq('email', email)
        if (data) return { success: true, name: data[0].name, email, role: data[0].role};
        else return false;
    }
    catch (err) {
        return console.error(err);
    }
}
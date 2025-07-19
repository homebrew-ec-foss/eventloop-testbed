import { supabase } from "../../api/index.js";
import { getParticipants } from '../../services/participantService.js';
import insertRecord from "./insert.js";

export async function getAuthUser(email, name) {
    try {
        const { data, error } = await supabase.from('dbAuthorisedUsers').select('*').eq('email', email);
        if (data && (data.keys >= 1 || data.length >= 1)) return { success: true, name: data[0].name, email, role: data[0].role};
        else {
            const data = await getParticipants({ email });
            if (data && !data['participants']['error']) return { success: true, name: data['participants'][0]['name'], email, role: data['participants'][0]['role'] }
            else {
                const newParticipant = await insertRecord('participants', { name, email });
                console.log(newParticipant);
                return { success: true, name: newParticipant[0]['name'], email, role: newParticipant[0]['role'] };
            }
        }
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
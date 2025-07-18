import { supabase } from "../../server.js";

async function getRecords(table, fields = {}) {
    try {
        const recordQuery = supabase.from(table).select('*');

        let filteredQuery = recordQuery;

        if (Object.keys(fields).length >= 1) {
            for(const [key, value] of Object.entries(fields)) {
                filteredQuery = filteredQuery.eq(key, value);
                console.log(filteredQuery);
            }
        }

        const { data, error } = await filteredQuery;

        if (!data.length >= 1) return { error: 'NA' };

        if (error) throw error;

        return data;
    }
    catch (err) {
        return console.log('err fetching records: ', err);
    }
}

export default getRecords
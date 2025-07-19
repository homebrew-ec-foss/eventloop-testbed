export default function validateEvent(req, res, next) {
    const name = req.body?.name?.trim();
    const date = req.body?.date;

    if (!name || !date) return res.status(400).json({ error: 'Missing fields' });

    if (name.length > 128) return res.status(400).json({ error: 'Name too long.' });

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });

    let parts = date.split("-");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10)

    let daysInMonths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if (month == 0 || month > 12) return res.status(400).json({ error: 'Invalid month.' });

    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        daysInMonths[1] = 29;
    }
    else {
        daysInMonths[1] = 28;
    }

    if(day > daysInMonths[month - 1]) return res.status(400).json({ error: 'Invalid date.' });

    const now = new Date();
    if (new Date(date) <= now) return res.status(400).json({ error: 'Event date cannot be in the past' }) ;
    
    req.validated = { name, date };
    next();
}
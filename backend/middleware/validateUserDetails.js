export default async function validateUserDetails(req, res, next) {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim();
    const role = req.body?.role?.trim();

    if (!name || !email) return res.status(400).json({ error: 'Missing fields' });

    if (name.length > 128) return res.status(400).json({ error: 'Name too long.' });
    if (email.length > 256) return res.status(400).json({ error: 'Email too long.' });

    const nameRegex = /^[a-zA-Z0-9 .,_-]{1,128}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nameRegex.test(name)) return res.status(400).json({ error: 'Illegal characters in name.' });
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format.' });

    req.validated = { name, email };
    next();
}
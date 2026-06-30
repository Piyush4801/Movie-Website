const express = require('express');
const router = express.Router();

router.use(async (req, res) => {
    try {
        const url = new URL(`https://api.themoviedb.org/3${req.path}`);
        if (req.url.includes('?')) {
            url.search = req.url.substring(req.url.indexOf('?'));
        }
        
        url.searchParams.set('api_key', process.env.TMDB_KEY);

        const response = await fetch(url.toString(), {
            method: req.method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('TMDB Proxy Error:', error);
        res.status(500).json({ message: 'Error communicating with TMDB API' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const request = require('request');
const { API_URL, API_KEY_URL } = require('../constants');

router.get('/tv/show/:tv_id', (req, res) => {
    const { tv_id } = req.params;

    request(API_URL + `/tv/${tv_id}${API_KEY_URL}`,
        (error, response, body) => {
            console.log(error)
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('show', {
                    data: data,
                    tv_id: tv_id,
                    media_type: 'tv'
                });
            }
        });
});


router.get('/movie/show/:movie_id', (req, res) => {
    const { movie_id } = req.params;

    request(API_URL + `/movie/${movie_id}${API_KEY_URL}`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('show', {
                    data: data,
                    movie_id: movie_id,
                    media_type: 'movie'
                });
            }
        });
});

router.get('/watchlist', (req, res) => {
    res.render('watchlist');
});

module.exports = router;
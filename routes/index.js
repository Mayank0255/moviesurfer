const express = require('express');
const router = express.Router();
const request = require('request');
const imageList = require('../config/image.config');
const { API_URL, MOVIE_GENRE_URL, TV_GENRE_URL } = require('../constants');

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/movie', (req, res) => {
    request(API_URL + MOVIE_GENRE_URL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const genreNames = JSON.parse(body);
            res.render('home', {
                genreNames: genreNames,
                type: 'movie',
                imageList: imageList
            });
        }
    });
});

router.get('/tv', (req, res) => {
    request(API_URL + TV_GENRE_URL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const genreNames = JSON.parse(body);
            res.render('home', {
                genreNames: genreNames,
                type: 'tv',
                imageList: imageList
            });
        }
    });
});

module.exports = router;
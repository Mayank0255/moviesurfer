const express = require('express');
const router = express.Router();
const request = require('request');
const { API_URL, API_KEY_URL } = require('../constants');

router.get('/movie/discover/:genre_name/:genre_id', (req, res) => {
    const { genre_id, genre_name } = req.params;
    const page = req.query.page;
    const pathname = req._parsedUrl.pathname;

    request(API_URL + `/discover/movie${API_KEY_URL}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre_id}`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('discover', {
                    data: data,
                    type: 'discover',
                    genre_name: genre_name,
                    genre_id: genre_id,
                    page: +page,
                    media_type: 'movie',
                    pathname: pathname
                });
            }
        });
});

router.get('/tv/discover/:genre_name/:genre_id', (req, res) => {
    const { genre_id, genre_name } = req.params;
    const page = req.query.page;
    const pathname = req._parsedUrl.pathname;

    request(API_URL + `/discover/tv${API_KEY_URL}&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${genre_id}&include_null_first_air_dates=false`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('discover', {
                    data: data,
                    type: 'discover',
                    genre_name: genre_name,
                    genre_id: genre_id,
                    page: +page,
                    media_type: 'tv',
                    pathname: pathname
                });
            }
        });
});

// ====================================================== MOST POPULAR AND TOP RATED =====================================================

// MOST POPULAR MOVIES
router.get('/movie/discover/pop', (req, res) => {
    const page = req.query.page;
    const pathname = req._parsedUrl.pathname;

    request(API_URL + `/movie/popular${API_KEY_URL}&page=${page}`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('discover', {
                    data: data,
                    type: 'pop',
                    page: +page,
                    media_type: 'movie',
                    pathname: pathname
                });
            }
        });
});

// TOP RATED MOVIES
router.get('/movie/discover/top', (req, res) => {
    const page = req.query.page;
    const pathname = req._parsedUrl.pathname;

    request(API_URL + `/movie/top_rated${API_KEY_URL}&page=${page}`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('discover', {
                    data: data,
                    type: 'top',
                    page: +page,
                    media_type: 'movie',
                    pathname: pathname
                });
            }
        });
});

// MOST POPULAR TV SHOWS

router.get('/tv/discover/pop', (req, res) => {
    const page = req.query.page;
    const pathname = req._parsedUrl.pathname;

    request(API_URL + `/tv/popular${API_KEY_URL}&page=${page}`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('discover', {
                    data: data,
                    type: 'pop',
                    page: +page,
                    media_type: 'tv',
                    pathname: pathname
                });
            }
        });
});

// TOP RATED TV SHOWS

router.get('/tv/discover/top', (req, res) => {
    const page = req.query.page;
    const pathname = req._parsedUrl.pathname;

    request(API_URL + `/tv/top_rated${API_KEY_URL}&page=${page}`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('discover', {
                    data: data,
                    type: 'top',
                    page: +page,
                    media_type: 'tv',
                    pathname: pathname
                });
            }
        });
});


// ======================================================= SEARCH PAGE ===================================================================

router.get('/search/:page', (req, res) => {
    const search = req.query.search
    const page = req.params.page

    request(API_URL + `/search/multi${API_KEY_URL}&query=${search}&page=${page}&include_adult=false`,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                res.render('search', {
                    data: data,
                    query: search,
                    page: +page
                });
            }
        });
});

module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('in /journal GET router');

    let queryText = `SELECT * FROM "journal";`;

    pool
        .query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.error(`ERROR! /journal GET router`, err);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;

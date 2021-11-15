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
    
    let queryText = `
    SELECT "journal".user_id, "fish_list".name AS "fishName", "lure_list".name AS "lureName", "journal".id, "journal".date, "journal".fish_image_url, "journal".weight, "journal".length, "journal".comments FROM "journal"
    JOIN "user" ON "user".id = "journal".user_id
    JOIN "fish_list" ON "fish_list".id = "journal".fish_id
    JOIN "lure_list" ON "lure_list".id = "journal".lure_id
    WHERE "user"."id" = $1
    ORDER BY "date" DESC;
    `;

    pool
        .query(queryText, [req.user.id])
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

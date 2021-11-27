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

    const queryText = `
    SELECT "journal".user_id, "fish_list".name AS "fishName", "lure_list".name AS "lureName", "journal".id, "journal".date, "journal".image_url, "journal".weight, "journal".length, "journal".comments FROM "journal"
    JOIN "user" ON "user".id = "journal".user_id
    JOIN "fish_list" ON "fish_list".id = "journal".fish_id
    JOIN "lure_list" ON "lure_list".id = "journal".lure_id
    WHERE "user"."id" = $1
    ORDER BY "date" DESC
    LIMIT 20;
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
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    console.log(`in /journal POST router`);
    console.log(req.body.image_url);
    let image_url = req.body.image_url;
    let weight = null;
    let length = null;

    if (req.body.image_url === '') {
        image_url = 'images/fish.svg';
    }
    if (req.body.weight !== '') {
        weight = req.body.weight;
    }
    if (req.body.length !== '') {
        length = req.body.length;
    }

    const queryText = `
        INSERT INTO "journal" ("user_id", "fish_id", "lure_id", "date", "image_url", "weight", "length", "comments")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    const values = [req.user.id, req.body.fish_id, req.body.lure_id, req.body.date, image_url, weight, length, req.body.comments]

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`/journal POST successful`);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`ERROR in /journal POST`, err);
            res.sendStatus(500);
        })
});

module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    rejectClearance,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('in /lure GET router');

    let queryText = `
        SELECT * FROM "lure_list"
        ORDER BY "id";
    `;

    pool
        .query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.error(`ERROR! /lure GET router`, err);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', rejectClearance, (req, res) => {
    // POST route code here
    console.log(`in /lure POST router`);
    const values = [req.body.name, req.body.description, req.body.image_url];
    const queryText = `
        INSERT INTO "lure_list" ("name", "description", "image_url")
        VALUES ($1, $2, $3)
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully added new lure`);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(`ERROR! /lure POST router`, err);
            res.sendStatus(500);
        })

});

//DELETE ROUTE 
router.delete(`/:id`, rejectClearance, (req, res) => {
    console.log(`in /lure DELETE router`);
    console.log(req.params.id);

    const id = req.params.id;
    const values = [id];
    const queryText = `
        DELETE FROM "lure_list"
        WHERE "id" = $1;
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully deleted lure ID #`, id);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(`ERROR! /lure/:id DELETE router`, err);
            res.sendStatus(500);
        })
})

//PUT ROUTE
router.put(`/:id`, rejectClearance, (req, res) => {
    console.log(`in /lure PUT router`);
    const values = [req.body.name, req.body.description, req.body.image_url, req.params.id];
    const queryText = `
        UPDATE "lure_list"
        SET "name" = $1,
        "description" = $2,
        "image_url" = $3
        WHERE "id" = $4;
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully updated lure ID#`, req.params.id);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(`ERROR! /lure/:id PUT router`, err);
            res.sendStatus(500);
        });
})
module.exports = router;

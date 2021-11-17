const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log('in /fish GET router');

    let queryText = `SELECT * FROM "fish_list";`;

    pool
        .query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.error(`ERROR! /fish GET router`, err);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

//DELETE ROUTE 
router.delete(`/:id`, (req, res) => {
    console.log(`in /fish DELETE router`);
    console.log(req.params.id);

    const id = req.params.id;
    const values = [id];
    const queryText = `
        DELETE FROM "fish_list"
        WHERE "id" = $1;
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully deleted fish ID #`, id);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`ERROR! /fish/:id DELETE router`, err);
            res.sendStatus(500);
        })
})

//PUT ROUTE
router.put(`/:id`, (req, res) => {
    console.log(`in /fish PUT router`);
    const values = [req.body.name, req.body.description, req.body.image_url, req.params.id];
    const queryText = `
        UPDATE "fish_list"
        SET "name" = $1,
        "description" = $2,
        "image_url" = $3
        WHERE "id" = $4;
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully updated fish ID#`, req.params.id);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`ERROR! /fish/:id PUT router`, err);
            res.sendStatus(500);
        });
})
module.exports = router;

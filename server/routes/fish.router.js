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
    console.log('in /fish GET router');

    let queryText = `
        SELECT * FROM "fish_list"
        ORDER BY "id";
    `;

    pool
        .query(queryText)
        .then((result) => {
            console.log(`successfully got fish list from DB`);
            res.send(result.rows);
        })
        .catch((err) => {
            console.error(`ERROR! /fish GET router`, err);
            res.sendStatus(500);
        });
});

//fish COUNT GET router
router.get(`/count/:id`, rejectUnauthenticated, (req, res) => {
    console.log(req.params.id);

    let fish_id = req.params.id;

    //FIRST RENDER on useEffect so grabbing just the very first row data
    //first query to get id of fish in first row of db
    if (fish_id === `first_row`) {
        let queryText = `
            SELECT * FROM "fish_list"
            ORDER BY "id" ASC LIMIT 1;
        `;


        pool
            .query(queryText)
            .then((result) => {
                //2nd query to grab the total count of top 3 lures used to catch fish_id
                console.log(`fish id of first row is `, result.rows[0].id);
                fish_id = result.rows[0].id;
                const values = [fish_id];

                queryText = `
                    SELECT COUNT("journal".fish_id) as "total", "name" FROM "lure_list"
                    JOIN "journal" ON "journal".lure_id = "lure_list".id
                    WHERE "journal".fish_id = $1
                    GROUP BY "lure_list".name
                    ORDER BY "total" DESC
                    LIMIT 3;
                `;


                pool
                    .query(queryText, values)
                    .then((result) => {
                        console.log(`successfully gotten count for fish id`, fish_id);
                        res.send(result.rows);
                    })
                    .catch((err) => {
                        console.error(`ERROR getting fish_count for fish_id `, fish_id, err);
                        res.sendStatus(500);
                    })
            })
            .catch((err) => {
                console.error(`ERROR getting fish_list.id of first row`, err)
            })
    }
    else {
        //we already know fish_id from client side so just get count query
        const values = [fish_id];
        const queryText = `
                    SELECT COUNT("journal".fish_id) as "total", "name" FROM "lure_list"
                    JOIN "journal" ON "journal".lure_id = "lure_list".id
                    WHERE "journal".fish_id = $1
                    GROUP BY "lure_list".name
                    ORDER BY "total" DESC
                    LIMIT 3;
                `;


        pool
            .query(queryText, values)
            .then((result) => {
                console.log(`successfully gotten count for fish id`, fish_id);
                res.send(result.rows);
            })
            .catch((err) => {
                console.error(`ERROR getting fish_count for fish_id `, fish_id, err);
                res.sendStatus(500);
            })
    }
})

/**
 * POST route template
 */
router.post('/', rejectClearance, (req, res) => {
    // POST route code here
    console.log(`in /fish POST router`);
    console.log(`this is req.body`, req.body);
    const values = [req.body.name, req.body.habitat, req.body.feeding_preferences, req.body.image_url];
    const queryText = `
        INSERT INTO "fish_list" ("name", "habitat", "feeding_preferences", "image_url")
        VALUES ($1, $2, $3, $4)
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully added new fish`);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(`ERROR! /fish POST router`, err);
            res.sendStatus(500);
        })

});

//DELETE ROUTE 
router.delete(`/:id`, rejectClearance, (req, res) => {
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
            console.error(`ERROR! /fish/:id DELETE router`, err);
            res.sendStatus(500);
        })
})

//PUT ROUTE
router.put(`/:id`, rejectClearance, (req, res) => {
    console.log(`in /fish PUT router`);
    const values = [req.body.name, req.body.habitat, req.body.feeding_preferences, req.body.image_url, req.params.id];
    const queryText = `
        UPDATE "fish_list"
        SET "name" = $1,
        "habitat" = $2,
        "feeding_preferences" = $3,
        "image_url" = $4
        WHERE "id" = $5;
    `;

    pool
        .query(queryText, values)
        .then((result) => {
            console.log(`successfully updated fish ID#`, req.params.id);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(`ERROR! /fish/:id PUT router`, err);
            res.sendStatus(500);
        });
});



module.exports = router;

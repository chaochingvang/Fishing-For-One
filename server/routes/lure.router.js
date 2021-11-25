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

//lure COUNT GET router
router.get(`/count/:id`, rejectUnauthenticated, (req, res) => {
    console.log(req.params.id);

    let lure_id = req.params.id;

    //FIRST RENDER on useEffect so grabbing just the very first row data
    //first query to get id of lure in first row of db
    if (lure_id === `first_row`) {
        let queryText = `
            SELECT * FROM "lure_list"
            ORDER BY "id" ASC LIMIT 1;
        `;


        pool
            .query(queryText)
            .then((result) => {
                //2nd query to grab the total count of top 3 lures used to catch fish_id
                console.log(`lure id of first row is `, result.rows[0].id);
                lure_id = result.rows[0].id;
                const values = [lure_id];

                queryText = `
                    SELECT COUNT("journal".lure_id) as "total", "name" FROM "fish_list"
                    JOIN "journal" ON "journal".fish_id = "fish_list".id
                    WHERE "journal".lure_id = $1
                    GROUP BY "fish_list".name
                    ORDER BY "total" DESC
                    LIMIT 3;                    
                `;


                pool
                    .query(queryText, values)
                    .then((result) => {
                        console.log(`successfully gotten count for lure id`, lure_id);
                        res.send(result.rows);
                    })
                    .catch((err) => {
                        console.error(`ERROR getting lure count for lure_id of first row`, lure_id, err);
                        res.sendStatus(500);
                    })
            })
            .catch((err) => {
                console.error(`ERROR getting lure_list.id of first row`, err)
            })
    }
    else {
        //we already know lure_id from client side so just get count query
        const values = [lure_id];
        const queryText = `
                    SELECT COUNT("journal".lure_id) as "total", "name" FROM "fish_list"
                    JOIN "journal" ON "journal".fish_id = "fish_list".id
                    WHERE "journal".lure_id = $1
                    GROUP BY "fish_list".name
                    ORDER BY "total" DESC
                    LIMIT 3;
                `;

        pool
            .query(queryText, values)
            .then((result) => {
                console.log(`successfully gotten count for lure id`, lure_id);
                res.send(result.rows);
            })
            .catch((err) => {
                console.error(`ERROR getting lure_count for lure_id `, lure_id, err);
                res.sendStatus(500);
            })
    }
})

/**
 * POST route template
 */
router.post('/', rejectClearance, (req, res) => {
    // POST route code here
    console.log(`in /lure POST router`);
    const values = [req.body.name, req.body.description, req.body.technique, req.body.target_fish, req.body.image_url];
    const queryText = `
        INSERT INTO "lure_list" ("name", "description", "technique", "target_fish", "image_url")
        VALUES ($1, $2, $3, $4, $5)
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
    const values = [req.body.name, req.body.description, req.body.technique, req.body.target_fish, req.body.image_url, req.params.id];
    const queryText = `
        UPDATE "lure_list"
        SET "name" = $1,
        "description" = $2,
        "technique" = $3,
        "target_fish" = $4,
        "image_url" = $5
        WHERE "id" = $6;
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

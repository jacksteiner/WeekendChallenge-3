const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    console.log('in GET tasks')
    const queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText).then((result) => {
        console.log('SELECT SUCCESS!', result)
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error)
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    const tasks = req.body;
    const queryText = `INSERT INTO "tasks" ("taskname") 
                        VALUES ($1, $2)`
    pool.query(queryText, [tasks.taskname, tasks.complete])
        .then((results) => {
            console.log(results);
            res.send(results);
        })
        .catch((error) => {
            console.log('ERROR in post /tasks', error);
            res.sendStatus(500);
        })
});

router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;';
    pool.query(queryText, [taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
})


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
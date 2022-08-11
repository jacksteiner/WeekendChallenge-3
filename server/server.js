const express = require('express');

const app = express();
const PORT = 5002;

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
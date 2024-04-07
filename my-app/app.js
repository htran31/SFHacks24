const express = require('express');
const axios = require('axios'); 
const fs = require('fs');
const path = require('path'); 
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', async(req, res) => {
    try {
        const result = await getResponse();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


app.listen(3000, () => {
    console.log("Server is listening at 3000");
});

module.exports = app;




const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// app.get('/', async (req, res) => {
//     try {
//         const result = await getResponse();
//         console.log(result);
//         res.send(result);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Endpoint to fetch response from the getResponse function
app.get('/fetch-response', async (req, res) => {
    try {
        const response = await getResponse();
        res.send(response);
    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(3000, () => {
    console.log("Server is listening at 3000");
});

module.exports = app;




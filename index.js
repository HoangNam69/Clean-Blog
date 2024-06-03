const express = require('express');
const app = express();

app.listen(3030, () => {
    console.log('Server is running on port 3030');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
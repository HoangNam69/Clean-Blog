const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public')); // Sử dụng file tĩnh trong thư mục public

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/index.html'));
});
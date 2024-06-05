const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.use(express.static('public')); // Sử dụng file tĩnh trong thư mục public

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './pages/index.html'));
// });

// Sử dụng EJS
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('.about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post');
})
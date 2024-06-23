const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/clean_blog');

app.use(express.static('public')); // Sử dụng file tĩnh trong thư mục public

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './pages/index.html'));
// });

// Sử dụng EJS
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});
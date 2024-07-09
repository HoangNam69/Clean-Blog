const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload')
// import to module:
const newPostController = require('./controllers/newPost.js');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/clean_blog');

app.use(express.static('public')); // Sử dụng file tĩnh trong thư mục public

//  listen port 4000 de chay server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

// Sử dụng fileUpload để upload file
app.use(fileUpload());

// Sử dụng body-parser để lấy dữ liệu từ form input xử lý trong req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './pages/index.html'));
// });

// Sử dụng EJS
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    showAllBlogPost(res);
    // res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', (req, res) => {
    showBlogPost(req, res);
})

app.get('/posts/new', newPostController);

app.post('/posts/store', (req, res) => {
    console.log(req.body);
    let image = req.files.image;
    const result = {
        title: req.body.title,
        body: req.body.body,
        image: '/upload/' + image.name
    }
    // Xử lý chuyen file hinh anh qua thu muc upload
    image.mv(path.resolve(__dirname, 'public/upload', image.name));
    createBlogPost(result);
    res.redirect('/');
});

async function createBlogPost(data) {
    console.log(data);
    try {
        await BlogPost.create(data);
    } catch (e) {
        console.log(e);
    }
}

async function showAllBlogPost(res) {
    try {
       const posts = await BlogPost.find({});
        // console.log(allBlogPost)
        res.render('index', {blogposts: posts});
    } catch (e) {
        console.log(e);
    }
}

async function showBlogPost(req, res) {
    try {
        const post = await BlogPost.findById(req.params.id);
        console.log(post);
        res.render('post', {detailPost: post});
    } catch (e) {
        console.log(e);
    }
}
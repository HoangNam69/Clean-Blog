const express = require('express');
const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
// import to module:
const newPostController = require('./controllers/newPost.js');
const homeController = require('./controllers/home.js');
const getPostConntroller = require('./controllers/getPost.js');
const storePostController = require('./controllers/storePost.js');
// middleware
const validateMiddleWare = require('./middleware/validationMiddleware.js');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/clean_blog');

app.use(express.static('public')); // Sử dụng file tĩnh trong thư mục public
app.use('/posts/store', validateMiddleWare); // Sử dụng middleware để kiểm tra dữ liệu nhập vào

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


app.get('/', homeController);

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', getPostConntroller);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);
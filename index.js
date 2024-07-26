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
const newUserController = require('./controllers/newUser.js');
const storeUserController = require('./controllers/storeUser.js');
const loginController = require('./controllers/login.js');
const loginUserController = require('./controllers/loginUser.js');
const expressSession = require('express-session');

// middleware
const validateMiddleWare = require('./middleware/validationMiddleware.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/clean_blog');

// Sử dụng file tĩnh trong thư mục public
app.use(express.static('public'));

//  listen port 4000 de chay server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

// Sử dụng body-parser để lấy dữ liệu từ form input xử lý trong req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng fileUpload để upload file
app.use(fileUpload());

// Sử dụng middleware để kiểm tra dữ liệu nhập vào
app.use('/posts/store', validateMiddleWare);


// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './pages/index.html'));
// });

// Sử dụng express-session
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

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

app.get('/posts/new', authMiddleware, newPostController);

app.post('/posts/store', storePostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
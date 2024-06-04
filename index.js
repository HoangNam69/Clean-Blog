const express = require('express');
const app = express();

app.use(express.static('public')); // Sử dụng file tĩnh trong thư mục public

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

app.get('/', (req, res) => {
    res.send('Xin chào tôi là Lê Hoàng Nam người đã tạo ra trang web này');
});
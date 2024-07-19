const BlogPost = require("../models/BlogPost.js");
const path = require("path");

module.exports = (req, res) => {
  let image = req.files.image;
  const result = {
    title: req.body.title,
    body: req.body.body,
    image: "/upload/" + image.name,
  };
  // Xử lý chuyen file hinh anh qua thu muc upload
  image.mv(path.resolve(__dirname, "../public/upload", image.name));
  createBlogPost(result);
  res.redirect("/");
};
async function createBlogPost(data) {
  try {
    await BlogPost.create(data);
  } catch (e) {
    console.log(e);
  }
}
